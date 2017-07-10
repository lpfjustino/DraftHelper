import { Injectable } 		from '@angular/core';
import { Headers, Http } 	from '@angular/http';

import { Observable } 		from "RxJS/Rx";
import 'rxjs/add/operator/toPromise';

import {URLSearchParams} 	from '@angular/http';

@Injectable()
export class CrawlerService {
	constructor(private http: Http) { 
	}

	crawl() {
		var test;
		var search = new URLSearchParams();

		this.http.get("http://champion.gg/champion/riven", {search}).toPromise().then(res => test = res.json());
		console.log(test);
	}

}
