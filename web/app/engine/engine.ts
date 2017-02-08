import 'rxjs/Rx';
import { Observable } 				from "rxjs/Observable";
import { Observer } 				from "rxjs/Observer";
import { BehaviorSubject } 			from "rxjs/BehaviorSubject";

import { Champion } 				from '../champions/champion';

import { ChampionService }			from '../champions/champion.service';
import { StatisticsService }		from './services/statistics.service';

export interface PickAppraiser {
	readonly weight: number;
	options: PickQuality[];

	choose(n?: number): Observable<PickQuality[]>;
	reevaluate(): void;
}

export class BaseChoice implements PickAppraiser {
	weight = 0;
	options = new Array<PickQuality>();

	constructor(private championService: ChampionService) {}

	getOptions(): Observable<PickQuality[]> {
		if(this.options.length == 0) {
			var optionsObserver: Observer<PickQuality[]>;
			this.championService.getChampions()
				.subscribe(champions => {
					champions.forEach(champion => this.options.push(new PickQuality(champion, 0)));
					optionsObserver.next(this.options);
				});
			return new Observable(observer => optionsObserver = observer);
		}
		else {
			return Observable.of(this.options);
		}
	}

	choose(n?: number): Observable<PickQuality[]> {
		var chosenObserver: Observer<PickQuality[]>;
		
		this.getOptions().subscribe(options => {
				alert(n);
				this.reevaluate();
		
				var sorted = options.sort((a, b) => b.score - a.score);
				var chosen: PickQuality[];

				if(n) chosen = sorted.slice(0, n);
				else chosen = sorted.slice(0, 1);

				chosenObserver.next(chosen);
		});

		let obs = new Observable<PickQuality[]>(observer => chosenObserver = observer);
		return obs;
	}

	reevaluate(): void {
		// The base choice does not change any priorities
		//this.options.forEach(opt => {opt.score = opt.champ.stats.armor});
	}
}

abstract class ChoiceEngineDecorator implements PickAppraiser {
	protected readonly decoratedAppraisal: PickAppraiser;
	readonly weight: number;
	options: PickQuality[];

	constructor(pickAppraiser: PickAppraiser,
		weight: number,
		private statsService: StatisticsService) {
		this.decoratedAppraisal = pickAppraiser;
		this.weight = weight;
		this.options = pickAppraiser.options;

		this.reevaluate();
	}

	choose(n?: number): Observable<PickQuality[]> {
		return this.decoratedAppraisal.choose(n);
	}

	reevaluate(): void {
		this.decoratedAppraisal.reevaluate();
	}
}

export class GlobalWinrateDecorator extends ChoiceEngineDecorator {
	constructor(pickAppraiser: PickAppraiser,
		weight: number,
		statsService: StatisticsService) {
		super(pickAppraiser, weight, statsService);
	}

	choose(n?: number): Observable<PickQuality[]> {
		return super.choose(n);
	}

	reevaluate(): void {
		// The base choice does not change any priorities
		this.options.forEach(opt => {opt.score += opt.champ.stats.hp});
	}
}

class PickQuality {
	champ: Champion;
	score: number;

	constructor(champ: Champion, score: number) {
		this.champ = champ;
		this.score = score;
	}
}