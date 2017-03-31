import 'rxjs/Rx';
import { Observable } 				from "rxjs/Observable";
import { Observer } 				from "rxjs/Observer";
import { BehaviorSubject } 			from "rxjs/BehaviorSubject";
import { Subject } 					from "rxjs/Subject";

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
	options  : PickQuality[] = [];

	private optionsSubject = new Subject<PickQuality[]>();

	constructor(private championService: ChampionService) {}

	getOptions(): Observable<PickQuality[]> {
		console.log("MY LENGTH: ", this.options.length)
		if(this.options.length == 0) {
			this.championService.getChampions()
				.subscribe(champions => {
					if(this.options.length != 0) return;
					champions.forEach(champion => this.options.push(new PickQuality(champion, 0)));
					this.reevaluate();
					this.optionsSubject.next(this.options);
				});

			return this.optionsSubject.asObservable();
		}
		else
			return Observable.of(this.options);
	}

	choose(n?: number): Observable<PickQuality[]> {
		var chooseSubject = new Subject<PickQuality[]>();

		this.getOptions().subscribe(options => {
				var chosen: PickQuality[];

				//if(n) chosen = sorted.slice(0, n);
				//else chosen = sorted.slice(0, 1);

				var chosen = n ? options.slice(0,n) : options.slice(0,1);

				chooseSubject.next(chosen);
				chooseSubject.complete();
		});

		//return this.chosenObservable;
		return chooseSubject.asObservable()
	}

	reevaluate(): void {
		console.log("penis")
		// The base choice does not change any priorities
		this.options.forEach(opt => {opt.score += opt.champ.stats.armor});
		this.options.sort((a, b) => b.score - a.score);
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

		//this.reevaluate();
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
		this.reevaluate();
	}

	choose(n?: number): Observable<PickQuality[]> {
		return super.choose(n);
	}

	reevaluate(): void {
		console.log("penis grande")
		// The base choice does not change any priorities
		console.log(this.options)
		//this.decoratedAppraisal.options.forEach(opt => {opt.score += opt.champ.stats.hp; console.log(opt.score, opt.champ.stats.hp, opt.champ.name)});
		this.options.forEach(opt => {
			opt.score += opt.champ.stats.hp; 
			console.log(opt.score, opt.champ.stats.hp, opt.champ.name)
		});
		console.log(this.options)
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