import { Injectable } 		from '@angular/core';
import { Headers, Http } 	from '@angular/http';

import { Champion }			from './champions/champion'

import { Observable } from "RxJS/Rx";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChampionService {
	private championsUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';	// URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	private champions: Champion[] = [];

	constructor(private http: Http) { 
		this.getChampions()
			.then(champions => {
				// Iterates through the list of champions adding them to the current object
				Object.keys(champions).map(key => this.champions.push(champions[key]))
			});
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

/*
	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
			.put(url, JSON.stringify(hero), {headers: this.headers})
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http
			.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}
*/
}
