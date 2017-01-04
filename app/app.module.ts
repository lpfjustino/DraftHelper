import { NgModule } 						from '@angular/core';
import { FormsModule } 						from '@angular/forms';
import { BrowserModule } 					from '@angular/platform-browser';
import { DatepickerModule, AlertModule } 	from 'ng2-bootstrap';
import { HttpModule } 						from '@angular/http';
import { MaterialModule } 					from '@angular/material';

import { AppComponent } 					from './app.component';
import { CurrentDraftComponent } 			from './current-draft.component';
import { ChampionListComponent } 			from './champions/champion-list.component';

import { ChampionService }					from './champion.service';

//import 'hammerjs';

@NgModule({
	declarations: [
		AppComponent,
		CurrentDraftComponent,
		ChampionListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot(),
		DatepickerModule.forRoot(),
		MaterialModule.forRoot()
	],
	providers: [
		ChampionService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}