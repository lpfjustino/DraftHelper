import { Injectable } 		from '@angular/core';

import { Champion }			from '../../champions/champion'

import { Observable } from "RxJS/Rx";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChampionService {
	/*
	private headers = new Headers({'Content-Type': 'application/json'});
	private championsUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';	// URL to web api

	private champions: Champion[] = [];

	constructor(private http: Http) { 
		this.getChampions()
			.then(champions => this.champions = champions);
		// TODO: trocar a versão do championsurl
		//this.crawl();
	}

	getChampions(): Promise<Champion[]> {
		return this.http.get(this.championsUrl)
							 .toPromise()
							 .then(response => response.json().data as Champion[])
							 .catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	getChampion(id: number) : Champion {
		return this.champions.filter(champ => champ.id == id)[0];
	}

	getVersion() : Promise<string> {
			return this.http.get(this.championsUrl)
							 .toPromise()
							 .then(response => response.json().version)
							 .catch(this.handleError);
	}
	*/
}
