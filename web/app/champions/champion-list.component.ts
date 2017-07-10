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
		this.versionService.getVersion()
					.subscribe(ver => {
						this.currentVersion = ver;
						this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
							+ this.currentVersion +"/img/champion/";
					});
					
		this.championService.getChampions()
			.subscribe(champions => this.champions = champions);
	};

	selected(id: string) {
		this.draftService.selected(id);
	}
}
