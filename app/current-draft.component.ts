import { Injectable } 				from '@angular/core';
import { Component, OnInit } 		from '@angular/core';

import { Champion } 				from './champions/champion';
import { ChampionService } 			from './champion.service';

import { ChampionListComponent }	from './champions/champion-list.component';

export enum DraftState { T1B1, T1B2, T1B3, T1P1, T1P2, T1P3, T1P4, T1P5,
	T2B1, T2B2, T2B3, T2P1, T2P2, T2P3, T2P4, T2P5
};

@Component({
	moduleId: module.id,
	selector: 'current-draft',
	templateUrl: 'current-draft.component.html',
	styleUrls: ['current-draft.component.css']
})

export class CurrentDraftComponent implements OnInit {
	// Keeps the reference of DraftState enum
	states = DraftState;

	champions: Champion[];
	currentState: DraftState;
	draft: {};

	currentVersion: string = "";
	champImgBaseURL: string = "";

	mytest: Champion;

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
	}

	ngOnInit(): void {
		// Iterates through the list of champions adding them to the current object
		this.championService.getChampions()
			.then(champions => {
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			});
	};

	getStateFromDefinition(team : number, nr: number, isBan: boolean) {
		var stateName;
		if(isBan) stateName = "T" + team + "B" + nr;
		else stateName = "T" + team + "P" + nr;
		return DraftState[stateName];
	}

	setCurrentState(team : number, nr: number, isBan: boolean) {
		var state = this.getStateFromDefinition(team, nr, isBan);
		this.currentState = state;
	}

	isRoleFulfilled(team : number, nr: number, isBan: boolean) : boolean {
		var state = this.getStateFromDefinition(team, nr, isBan);
		return this.draft[state] != undefined;
	}

	getChampionOnRoleURL(team : number, nr: number, isBan: boolean) {
		var state = this.getStateFromDefinition(team, nr, isBan);
		return this.champImgBaseURL + this.draft[state].image.full;
	}

	getPlaceholderURL(team : number, isBan: boolean) {
		if(isBan) {
			if(team == 1) return "resources/blue_team_ban.png";
			else return "resources/red_team_ban.png"
		} else {
			if(team == 1) return "resources/blue_team_pick.png";
			else return "resources/red_team_pick.png"
		}
	}

	championSelected(champ : Champion) {
		this.draft[this.currentState] = champ;
	}
}
