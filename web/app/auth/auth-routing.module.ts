import { NgModule } 						      		from '@angular/core';
import { RouterModule } 					    		from '@angular/router';

import { AuthRoutes }											from './auth.routing';

import { MyAlertComponent } 							from './_directives/index';
import { AuthGuard } 											from './_guards/index';
import { AlertService,
	AuthenticationService,
	UserService }														from './_services/index';
import { fakeBackendProvider } 						from './_helpers/index';
import { MockBackend, MockConnection } 		from '@angular/http/testing';
import { BaseRequestOptions }							from '@angular/http';

import { SummonerInfoComponent } 					from './summoner/index';
import { LoginComponent } 								from './login/index';
import { RegisterComponent } 							from './register/index';

@NgModule({
	imports: [
		AuthRoutes
	],
	exports: [
			RouterModule
		],
		providers: [
		// Authentication providers
				AuthGuard,
				AlertService,
				AuthenticationService,
				UserService,

				/*
				// Providers used to create fake backend
				fakeBackendProvider,
				MockBackend,
				BaseRequestOptions,
		*/
		]
})

export class AuthRoutingModule {
}