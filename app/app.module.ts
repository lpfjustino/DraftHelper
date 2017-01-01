import { NgModule } 						from '@angular/core';
import { FormsModule }					 	from '@angular/forms';
import { BrowserModule } 					from '@angular/platform-browser';
import { HttpModule } 						from '@angular/http';

// Bootstrap imports
import { DatepickerModule, AlertModule } 	from 'ng2-bootstrap';

// Angular Material 2 imports
import { MaterialModule } 					from '@angular/material';

import { AppComponent } 					from './app.component';
import { CurrentDraftComponent } 			from './current-draft.component';
import { ChampionService } 					from './champion.service';

@NgModule({
	declarations: [
		AppComponent,
		CurrentDraftComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot(),
		DatepickerModule.forRoot(),
		MaterialModule.forRoot()
	],
	providers: [ ChampionService ],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}