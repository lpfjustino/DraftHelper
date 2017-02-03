import { Injectable } 				from '@angular/core';
import { Component, OnInit } 		from '@angular/core';

import { Champion } 				from '../champions/champion';
import { ChampionService } 			from '../champions/champion.service';

import { ChampionListComponent }	from '../champions/champion-list.component';

import { DraftState,
		DraftService,
		Dictionary }				from './draft.service';

import { BehaviorSubject } 			from 'rxjs/Rx';

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
	draft: Dictionary;

	currentVersion: string = "";
	champImgBaseURL: string = "";

	constructor(private championService: ChampionService, private draftService: DraftService) {
		this.champions = [];
		this.currentState = this.states.T1B1;
		
		this.draft = this.draftService.getCurrentDraft();
		this.draftService.draftChange.subscribe(data => this.draft = data);
	}

	ngOnInit(): void {
		// Iterates through the list of champions adding them to the current object
		this.championService.getChampions()
			.then(champions => {
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			});

		// Gathers from champions .json the current version
		this.championService.getVersion()
							.then(ver => {
								this.currentVersion = ver;
								this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
									+ this.currentVersion +"/img/champion/";
							})
							.catch(err => console.log(err));
	};

	private getStateFromDefinition(team : number, nr: number, isBan: boolean) {
		var stateName;
		if(isBan) stateName = "T" + team + "B" + nr;
		else stateName = "T" + team + "P" + nr;
		return DraftState[stateName];
	}

	private setCurrentState(team : number, nr: number, isBan: boolean) {
		var state = this.getStateFromDefinition(team, nr, isBan);
		this.draftService.stateChanged(state);
	}

	private isRoleFulfilled(team : number, nr: number, isBan: boolean) : boolean {
		var state = this.getStateFromDefinition(team, nr, isBan);
		return this.draft[state] != undefined;
	}

	private getChampionOnRoleURL(team : number, nr: number, isBan: boolean) {
		var state = this.getStateFromDefinition(team, nr, isBan);
		return this.champImgBaseURL + this.draft[state].image.full;
	}

	private getPlaceholderURL(team : number, isBan: boolean) {
		if(isBan) {
			if(team == 1) return "resources/blue_team_ban.png";
			else return "resources/red_team_ban.png"
		} else {
			if(team == 1) return "resources/blue_team_pick.png";
			else return "resources/red_team_pick.png"
		}
	}
}
