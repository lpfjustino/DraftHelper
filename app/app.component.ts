import { Component }				from '@angular/core';
import { AlertComponent }	   		from 'ng2-bootstrap/ng2-bootstrap';
import { NgModel }					from '@angular/forms';

@Component({
 	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html'
})

export class AppComponent {
	public dt:Date = new Date();
	private minDate:Date = null;
	private events:Array<any>;
	private tomorrow:Date;
	private afterTomorrow:Date;
	private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
	private format = this.formats[0];
	private dateOptions:any = {
		formatYear: 'YY',
		startingDay: 1
	};
	private opened:boolean = false;

	public getDate():number {
		return this.dt && this.dt.getTime() || new Date().getTime();
	}
}