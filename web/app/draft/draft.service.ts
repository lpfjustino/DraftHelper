import { Injectable } 				from '@angular/core';

import { Champion }					from '../champions/champion'
import { ChampionService } 			from '../champions/champion.service';

import { Subject } 					from 'rxjs/Rx';
import { List }						from 'immutable';

@Injectable()
export class DraftService {
	// Keeps the reference of DraftState enum
	states = DraftState;

	champions: Champion[];
	currentState: DraftState;

	draftChange: Subject<Dictionary> = new Subject<Dictionary>();
	draft: Dictionary;

	constructor(private championService: ChampionService) {
		this.draft = {};
		this.champions = [];
		this.currentState = this.states.T1B1;

		// Sets every ban and pick as undefined
		for(var state in this.states) {
			this.draft[state] = undefined;
		}
	}

	getCurrentDraft(): Dictionary {
		return this.draft;
	}

	selected(id: string): void {
		var champ = this.championService.getChampion(id);
		this.championSelected(champ);
	}

	championSelected(champ : Champion): void {
		this.draft[this.currentState] = champ;
		this.draftChange.next(this.draft);
	}

	stateChanged(state: DraftState) {
		this.currentState = state;
	}

}

export enum DraftState { T1B1, T1B2, T1B3, T1P1, T1P2, T1P3, T1P4, T1P5,
	T2B1, T2B2, T2B3, T2P1, T2P2, T2P3, T2P4, T2P5
};

export interface Dictionary {
    [ index: string ]: Champion
}
