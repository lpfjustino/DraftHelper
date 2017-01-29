import { Champion } 	from '../champions/champion';

export interface PickAppraiser {
	choose(n?: number): PickQuality[];
}

export class BaseChoice implements PickAppraiser {
	choose(n?: number): PickQuality[] {
		return new Array<PickQuality>();
	}

}

export abstract class ChoiceEngineDecorator implements PickAppraiser {
	protected readonly decoratedAppraisal: PickAppraiser;
	weight: number;

	constructor(weight: number, pickAppraiser: PickAppraiser) {
		this.decoratedAppraisal = pickAppraiser;
		this.weight = weight
	}

	choose(n?: number): PickQuality[] {
		return this.decoratedAppraisal.choose();
	}
}

export class GlobalWinrateDecorator extends ChoiceEngineDecorator {
	
}

class PickQuality {
	champ: Champion;
	score: number;
}