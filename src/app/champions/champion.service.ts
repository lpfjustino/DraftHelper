import { Injectable } 		from '@angular/core';
import { Headers, Http } 	from '@angular/http';

import { Champion }			from './champion';

import { VersionService }	from '../services/version.service';

import 'rxjs/Rx';
import { Observable } 				from "rxjs/Observable";
import { Observer } 				from "rxjs/Observer";

import { URLSearchParams } 	from '@angular/http';

@Injectable()
export class ChampionService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private championsUrl = '';
	private currentVersion = '';

	private champions: Champion[] = [];

	private championsObserver: Observer<Champion[]>;

	constructor(private http: Http, private versionService: VersionService) {
	}

	getChampions(): Observable<Champion[]> {
		this.versionService
			.getVersion()
			.subscribe(ver => {
				this.currentVersion = ver;
				this.championsUrl = 'http://ddragon.leagueoflegends.com/cdn/'
									+ ver
									+ '/data/en_US/champion.json';
				this.http.get(this.championsUrl)
							.subscribe(response => {
								var champsObject = response.json().data;

								// Convert the incoming Object to Array
								Object.keys(champsObject).map(key => this.champions.push(champsObject[key]));

								this.championsObserver.next(this.champions);
							})
			});

		return new Observable<Champion[]>(observer => this.championsObserver = observer);
	}
	
	private handleError(error: any): Observable<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Observable.throw(error.message || error);
	}

	getChampion(id: string) : Champion {
		return this.champions.filter(champ => champ.id == id)[0];
	}
}
