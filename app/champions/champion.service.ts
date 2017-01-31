import { Injectable } 		from '@angular/core';
import { Headers, Http } 	from '@angular/http';

import { Champion }			from './champion';

import { VersionService }	from '../services/version.service';

//import 'rxjs/add/operator/map';

import 'rxjs/Rx';
import { Observable } 		from "rxjs/Observable";

import { URLSearchParams } 	from '@angular/http';

@Injectable()
export class ChampionService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private championsUrl = '';
	private currentVersion = '';

	private champions: Champion[] = [];

	constructor(private http: Http, private versionService: VersionService) {
		Promise.all([this.versionService.getVersion(), this.getChampions()]).then(a => {
			console.log(a);
		})

		this.getChampions().subscribe(champions => {
			// Iterates through the list of champions adding them to the current object
			Object.keys(champions).map(key => this.champions.push(champions[key]));
			console.log(this.champions);
			
		});
		/*
		this.getChampions()
			.then(champions => {
				// Iterates through the list of champions adding them to the current object
			});
		*/
		// TODO: trocar a versão do championsurl
	}

	getChampions(): Observable<Champion[]> {
		return this.versionService.getVersion()
							.map(ver => {
								this.currentVersion = ver;
								return this.currentVersion
							})
							.flatMap(ver => {
								this.championsUrl = 'http://ddragon.leagueoflegends.com/cdn/'
													+ ver
													+ '/data/en_US/champion.json';
								return this.http.get(this.championsUrl)
											.map(response => response.json().data as Champion[])
							})
	}
	
	private handleError(error: any): Observable<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Observable.throw(error.message || error);
	}

	getChampion(id: number) : Champion {
		return this.champions.filter(champ => champ.id == id)[0];
	}
}
