import { Component, OnInit, Optional } 		from '@angular/core';

import { Champion } 				from './champions/champion';
import { ChampionService } 			from './champion.service';

import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
	moduleId: module.id,
	selector: 'current-draft',
	templateUrl: 'current-draft.component.html',
	styleUrls: ['current-draft.component.css']
})

export class CurrentDraftComponent implements OnInit {

	champions: Champion[] = [];

	//constructor(private championService: ChampionService) { }
	constructor(private championService: ChampionService, private _dialog: MdDialog, private _snackbar: MdSnackBar) {
		// Update the value for the progress-bar on an interval.
		setInterval(() => {
			this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
		}, 200);
	}

	ngOnInit(): void {
		this.championService.getChampions()
			.then(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
				});
	};

		isDarkTheme: boolean = false;
	lastDialogResult: string;

	foods: any[] = [
		{name: 'Pizza', rating: 'Excellent'},
		{name: 'Burritos', rating: 'Great'},
		{name: 'French fries', rating: 'Pretty good'},
	];

	progress: number = 0;

	openDialog() {
		let dialogRef = this._dialog.open(DialogContent);

		dialogRef.afterClosed().subscribe(result => {
			this.lastDialogResult = result;
		})
	}

	showSnackbar() {
		this._snackbar.open('YUM SNACKS', 'CHEW');
	}
}

export class DialogContent {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}
