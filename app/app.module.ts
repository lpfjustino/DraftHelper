import { NgModule } 							from '@angular/core';
import { FormsModule } 							from '@angular/forms';
import { BrowserModule } 						from '@angular/platform-browser';
import { HttpModule } 							from '@angular/http';
import { MaterialModule } 						from '@angular/material';

// Main app components
import { AppComponent } 						from './app.component';
import { CurrentDraftComponent } 				from './draft/current-draft.component';
import { ChampionListComponent } 				from './champions/champion-list.component';
import { HomePageComponent } 					from './walkthrough/home-page.component';

// App services
import { ChampionService }						from './champions/champion.service';
import { DraftService }							from './draft/draft.service';
import { VersionService }						from './services/version.service';
import { StatisticsService }					from './engine/services/statistics.service';

// Authentication imports

import { AppRoutingModule }        				from './app-routing.module';
import { AuthRoutingModule }					from './auth/auth-routing.module';

	// Used to create fake backend
	import { fakeBackendProvider } 				from './auth/_helpers/index';
	import { MockBackend, MockConnection } 		from '@angular/http/testing';
	import { BaseRequestOptions } 				from '@angular/http';

import { MyAlertComponent } 					from './auth/_directives/index';
import { AuthGuard } 							from './auth/_guards/index';
import { AlertService,
	AuthenticationService,
	UserService } 								from './auth/_services/index';

// Authentication components
import { AuthComponent }						from './auth/auth.component'
import { SummonerInfoComponent } 				from './auth/summoner/index';
import { LoginComponent } 						from './auth/login/index';
import { RegisterComponent } 					from './auth/register/index';

@NgModule({
	declarations: [
		AppComponent,
		CurrentDraftComponent,
		ChampionListComponent,
		// Authentication components
		AuthComponent,
		MyAlertComponent,
        SummonerInfoComponent,
        HomePageComponent,
        LoginComponent,
        RegisterComponent,
        AuthComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		AuthRoutingModule,
		AppRoutingModule
	],
	providers: [
		ChampionService,
		DraftService,
		VersionService,
		StatisticsService
		
        /*
		// Authentication providers
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

        // Providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
		*/
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}