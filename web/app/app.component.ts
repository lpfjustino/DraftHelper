import { Component }				from '@angular/core';
import { NgModel }					from '@angular/forms';

import { GlobalVariable } 			from './global';

import {MdDialog,
	MdDialogRef,
	MdSnackBar} 					from '@angular/material';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})
export class AppComponent {
	appName: string = GlobalVariable.APP_NAME;
	isDarkTheme: boolean = false;
	lastDialogResult: string;

	constructor(private _dialog: MdDialog, private _snackbar: MdSnackBar) {
		// Update the value for the progress-bar on an interval.
		setInterval(() => {
			this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
		}, 200);
	}

	foods: any[] = [
		{name: 'Pizza', rating: 'Excellent'},
		{name: 'Burritos', rating: 'Great'},
		{name: 'French fries', rating: 'Pretty good'},
	];

	progress: number = 0;

	showSnackbar() {
		this._snackbar.open('YUM SNACKS', 'CHEW');
	}

}