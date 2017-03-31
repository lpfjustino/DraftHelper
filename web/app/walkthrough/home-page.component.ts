import { Injectable } 				from '@angular/core';
import { Component, OnInit } 		from '@angular/core';

import { ChampionService }			from '../champions/champion.service';
import { StatisticsService }		from '../engine/services/statistics.service';

import { BaseChoice,
		GlobalWinrateDecorator }	from '../engine/engine';

@Component({
	moduleId: module.id,
	selector: 'home-page',
	templateUrl: 'home-page.component.html',
})

export class HomePageComponent {
	constructor(championService: ChampionService,
		statsService: StatisticsService) {
		var test = new BaseChoice(championService);
		console.log(test);
		test.choose(3).subscribe(a => a.forEach(v => console.log(v.champ.name, v.score)));
		
		var test2 = new GlobalWinrateDecorator(test, 5, statsService);
		console.log(test2);
		test2.choose(3).subscribe(a => a.forEach(v => console.log(v.champ.name, v.score)));
	}
}
