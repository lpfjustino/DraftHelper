import { NgModule } 						from '@angular/core';
import { FormsModule } 						from '@angular/forms';
import { BrowserModule } 					from '@angular/platform-browser';
import { DatepickerModule, AlertModule } 	from 'ng2-bootstrap';
import { HttpModule } 						from '@angular/http';
import { MaterialModule } 					from '@angular/material';

import { AppComponent } 					from './app.component';
import { CurrentDraftComponent } 			from './current-draft.component';
import { ChampionListComponent } 			from './champions/champion-list.component';
import { AuthComponent } 					from './auth/auth.component';

import { ChampionService }					from './champion.service';

// Authentication imports
// Used to create fake backend
import { fakeBackendProvider } 				from './auth/_helpers/index';
import { MockBackend, MockConnection } 		from '@angular/http/testing';
import { BaseRequestOptions } 				from '@angular/http';

import { routing }        					from './auth/app.routing';

import { MyAlertComponent } 				from './auth/_directives/index';
import { AuthGuard } 						from './auth/_guards/index';
import { AlertService,
	AuthenticationService,
	UserService } 							from './auth/_services/index';
import { HomeComponent } 					from './auth/home/index';
import { LoginComponent } 					from './auth/login/index';
import { RegisterComponent } 				from './auth/register/index';

//import 'hammerjs';

@NgModule({
	declarations: [
		AppComponent,
		CurrentDraftComponent,
		ChampionListComponent,
		// Authentication components
		AuthComponent,
		MyAlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot(),
		DatepickerModule.forRoot(),
		MaterialModule.forRoot(),
		routing
	],
	providers: [
		ChampionService,
		
		// Authentication providers
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

        // Providers used to create fake backend
        /*
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
		*/
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}