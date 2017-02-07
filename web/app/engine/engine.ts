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
	reevaluate(options: PickQuality[]): void;
}

export class BaseChoice implements PickAppraiser {
	weight = 0;
	options = new Array<PickQuality>();

	private _chosen: BehaviorSubject<PickQuality[]> = new BehaviorSubject(new Array<PickQuality>());
	private chosenObserver: Observer<PickQuality[]>;

	constructor(private championService: ChampionService) {}

	choose(n?: number): Observable<PickQuality[]> {

		// Iterates through the list of champions adding them to the current object
		this.championService.getChampions()
			.subscribe(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.options.push(new PickQuality(champions[key], 0)))
				this.reevaluate(this.options);

				var sorted = this.options.sort((a, b) => b.score - a.score);
				var chosen;

				if(n) chosen = sorted.slice(0, n);
				else chosen = sorted.slice(0, 1);

				this.chosenObserver.next(chosen);
			});

		let obs = new Observable<PickQuality[]>(observer => this.chosenObserver = observer);
		return obs;
	}

	reevaluate(options: PickQuality[]): void {
		// The base choice does not change any priorities
		this.options.forEach(opt => {opt.score = opt.champ.stats.armor});
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

		this.reevaluate(this.options);
	}

	choose(n?: number): PickQuality[] {
		return this.decoratedAppraisal.choose(n);
	}

	reevaluate(options: PickQuality[]): void {
		this.decoratedAppraisal.reevaluate(options);
	}
}

export class GlobalWinrateDecorator extends ChoiceEngineDecorator {
	constructor(pickAppraiser: PickAppraiser,
		weight: number,
		statsService: StatisticsService) {
		super(pickAppraiser, weight, statsService);
	}

	choose(n?: number): PickQuality[] {
		return super.choose(n);
	}

	reevaluate(options: PickQuality[]): void {
		//this.decoratedAppraisal.reevaluate(options);
		let i = 0;
		options.forEach(option => {
			option.score += i;
			i++;
			console.log(option.score);
			console.log("ae porra");
		})
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