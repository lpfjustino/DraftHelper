import { Component, OnInit } 		from '@angular/core';

import { Champion } 				from './champion';
import { ChampionService } 			from './champion.service';

import { CurrentDraftComponent }	from '../draft/current-draft.component';

import { Inject }					from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'champion-list',
	templateUrl: 'champion-list.component.html',
	styleUrls: ['champion-list.component.css']
})

export class ChampionListComponent implements OnInit {
	champions: Champion[] = [];
	currentVersion: string = "";
	champImgBaseURL: string = "";

	constructor(private championService: ChampionService, private currentDraft : CurrentDraftComponent) {
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
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			})
			.catch(err => console.log(err));
	};

	selected(id: number) {
		var champ = this.championService.getChampion(id);
		this.currentDraft.championSelected(champ);
	}
}
