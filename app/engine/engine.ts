import { Champion } 				from '../champions/champion';

import { ChampionService }			from '../champions/champion.service';

export interface PickAppraiser {
	readonly weight: number;
	options: PickQuality[];

	choose(n?: number): PickQuality[];
	reevaluate(options: PickQuality[]): void;
}

export class BaseChoice implements PickAppraiser {
	weight = 0;
	options = new Array<PickQuality>();

	constructor(championService: ChampionService) {
		// Iterates through the list of champions adding them to the current object
		championService.getChampions()
			.subscribe(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.options.push(new PickQuality(champions[key], 0)))
			})
		console.log(this.options);
	}

	choose(n?: number): PickQuality[] {
		return this.options.sort((a, b) => a.score - b.score).splice(n);
	}

	reevaluate(options: PickQuality[]): void {
		// The base choice does not change any priorities
	}
}

export abstract class ChoiceEngineDecorator implements PickAppraiser {
	protected readonly decoratedAppraisal: PickAppraiser;
	readonly weight: number;
	options: PickQuality[];

	constructor(weight: number, pickAppraiser: PickAppraiser) {
		this.decoratedAppraisal = pickAppraiser;
		this.weight = weight;
		this.options = pickAppraiser.options;

		this.reevaluate(this.options);
	}

	choose(n?: number): PickQuality[] {
		return this.decoratedAppraisal.choose();
	}

	reevaluate(options: PickQuality[]): void {
		this.decoratedAppraisal.reevaluate(options);
	}
}

export class GlobalWinrateDecorator extends ChoiceEngineDecorator {
	constructor(weight: number, pickAppraiser: PickAppraiser) {
		super(weight, pickAppraiser);
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