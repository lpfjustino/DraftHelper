import { Injectable } 		from '@angular/core';
import { Headers, Http } 	from '@angular/http';

//import 'rxjs/add/operator/toPromise';

import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { URLSearchParams } 	from '@angular/http';

@Injectable()
export class VersionService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private currentVersion: string = "";

	constructor(private http: Http) {
	}

	private handleError(error: any): Observable<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Observable.throw(error.message || error);
	}

	getVersion() : Observable<string> {
		var versionURL = "https://global.api.pvp.net/api/lol/static-data/br/v1.2/versions?api_key=RGAPI-b3d46aee-ac08-4f27-ba0a-4b224c92bab1";
		return this.http.get(versionURL)
					.map(response => response.json()[0])
					.catch(this.handleError);

	}
}
