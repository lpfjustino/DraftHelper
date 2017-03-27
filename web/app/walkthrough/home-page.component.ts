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
		var test2 = new GlobalWinrateDecorator(test, 5, statsService);

		//console.log("instance");
		//console.log(test);
		console.log(test2);
		
		test.choose().subscribe(a => console.log(a));
		test.choose(5).subscribe(b => console.log(b));
		//test.choose(50).subscribe(c => console.log(c));
		//console.log(test2.choose());
		//console.log(test2.choose(5));
	}
}
