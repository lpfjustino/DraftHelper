import { Component, OnInit, Optional } 		from '@angular/core';

import { Champion } 				from './champions/champion';
import { ChampionService } 			from './champion.service';

import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

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

	champions: Champion[] = [];
	currentState: DraftState = this.states.T1B1;
	draft: {};
	champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/";

	mytest: Champion;

	//constructor(private championService: ChampionService) { }
	constructor(private championService: ChampionService, private _dialog: MdDialog, private _snackbar: MdSnackBar) {
		// Update the value for the progress-bar on an interval.
		setInterval(() => {
			this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
		}, 200);

		this.draft = [{}];
		for(var state in this.states) {
			this.draft[state.valueOf()] = undefined;
		}
	}

	ngOnInit(): void {
		this.championService.getChampions()
			.then(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
				});
	};

	team_1_bans: any[] = [
		{text: 'One', cols: 1, rows: 1, color: 'lightblue'},
		{text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
		{text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
	];

	team_1_picks: any[] = [
		{text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
		{text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
		{text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
		{text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
		{text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
	];

	isDarkTheme: boolean = false;
	lastDialogResult: string;

	foods: any[] = [
		{name: 'Pizza', rating: 'Excellent'},
		{name: 'Burritos', rating: 'Great'},
		{name: 'French fries', rating: 'Pretty good'},
	];

	progress: number = 0;

	showSnackbar() {
		this._snackbar.open('YUM SNACKS', 'CHEW');
	}

	testing() {
		//this.currentState = DraftState.T1B1;
		console.log(this.draft);
		alert(this.states);
		alert(this.currentState);
		alert(this.draft[this.currentState]);
		this.mytest = this.draft[this.currentState];
		alert(this.champImgBaseURL + this.mytest.image.full)
		alert(this.champImgBaseURL + this.draft[this.currentState].image.full)
	}

	selected(id: number) {
		var index = this.currentState.toString();
		alert(index);
		this.draft[index] = this.getChampion(id);
	}

	setCurrentState(state: DraftState) {
		alert(state);
		this.currentState = state;
	}

	getChampion(id: number) : Champion {
		return this.champions.filter(champ => champ.id == id)[0];
	}
}
