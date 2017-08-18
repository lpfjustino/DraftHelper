import { NgModule } 						from '@angular/core';
import { RouterModule } 					from '@angular/router';

import { MockBackend, MockConnection } 		from '@angular/http/testing';
import { BaseRequestOptions } 				from '@angular/http';

import { AppRoutes }						from './app.routing';

@NgModule({
	imports: [
		AppRoutes
	],
	exports: [
    	RouterModule
  	],
})

export class AppRoutingModule {
}