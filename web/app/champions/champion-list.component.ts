import { Component, OnInit } 		from '@angular/core';

import { Champion } 				from './champion';
import { ChampionService } 			from './champion.service';
import { VersionService }			from '../services/version.service'

import { DraftService }				from '../draft/draft.service';

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

	constructor(
		private championService: ChampionService,
		private draftService : DraftService,
		private versionService: VersionService) {
	}

	ngOnInit(): void {
		// Gathers from champions .json the current version
		this.versionService.getVersion()
					.subscribe(ver => {
						this.currentVersion = ver;
						this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
							+ this.currentVersion +"/img/champion/";
					});
					
		// Iterates through the list of champions adding them to the current object
		this.championService.getChampions()
			.subscribe(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			})
	};

	selected(id: number) {
		this.draftService.selected(id);
	}
}
