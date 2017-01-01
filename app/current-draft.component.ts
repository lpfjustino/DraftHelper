import { Component, OnInit } 		from '@angular/core';

import { Champion } 				from './champions/champion';
import { ChampionService } 			from './champion.service';

@Component({
	moduleId: module.id,
	selector: 'current-draft',
	templateUrl: 'current-draft.component.html'
})

export class CurrentDraftComponent implements OnInit {

	champions: Champion[] = [];

	constructor(private championService: ChampionService) { }

	ngOnInit(): void {
		this.championService.getChampions()
			.subscribe(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
				});
	};
}