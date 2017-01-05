import { Injectable } 		from '@angular/core';

import { Champion }			from './champions/champion';
import { ChampionService } 			from './champion.service';

export enum DraftState { T1B1, T1B2, T1B3, T1P1, T1P2, T1P3, T1P4, T1P5,
	T2B1, T2B2, T2B3, T2P1, T2P2, T2P3, T2P4, T2P5
};

@Injectable()
export class DraftService {
	// Keeps the reference of DraftState enum
	states = DraftState;

	champions: Champion[] = [];

	currentState: DraftState;
	draft: {};

	currentVersion: string = "";
	champImgBaseURL: string = "";

	constructor(private championService: ChampionService) {
		this.draft = [{}];
		this.champions = [];
		this.currentState = this.states.T1B1;

		// Sets every ban and pick as undefined
		for(var state in this.states) {
			this.draft[state] = undefined;
		}

		// Gathers from champions .json the current version
		this.championService.getVersion()
							.then(ver => {
								this.currentVersion = ver;
								this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
									+ this.currentVersion +"/img/champion/";
							})
							.catch(err => console.log(err));

		// Iterates through the list of champions adding them to the current object
		this.championService.getChampions()
			.then(champions => {
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			});
	}

	getCurrentState() : DraftState {
		return this.currentState;
	}

	getDraft() {
		return this.draft;
	}
}