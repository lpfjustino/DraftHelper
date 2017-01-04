import { Component, OnInit } 		from '@angular/core';

import { Champion } 				from './champion';
import { ChampionService } 			from '../champion.service';
import { CurrentDraftComponent }	from '../current-draft.component'

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

	//constructor(private championService: ChampionService) { }
	constructor(private championService: ChampionService, private currentDraft: CurrentDraftComponent) {
		this.championService.getVersion()
					.then(ver => {
						this.currentVersion = ver;
						this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
							+ this.currentVersion +"/img/champion/";
					})
					.catch(err => console.log(err));
	}

	ngOnInit(): void {
		this.championService.getChampions()
			.then(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			});
	};

	selected(id: number) {
		var index = this.currentDraft.currentState.toString();
		this.currentDraft.draft[index] = this.championService.getChampion(id);
	}
}
