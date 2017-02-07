import { Routes, RouterModule } 	from '@angular/router';

import { SummonerInfoComponent } 	from './summoner/index';
import { LoginComponent } 			from './login/index';
import { RegisterComponent } 		from './register/index';

import { AuthComponent } 			from './auth.component';

import { AuthGuard } 				from './_guards/index';

import { HomePageComponent}			from '../walkthrough/home-page.component';

const authRoutes: Routes = [
	{ 
		path: 'auth',
		outlet: 'authOutlet',
		component: SummonerInfoComponent,
		canActivate: [AuthGuard]
	},
	//	children: [
    		//{ path: '', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    		//{ path: 'summoner', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    		{ path: 'auth/summoner', component: SummonerInfoComponent, canActivate: [AuthGuard], outlet: 'authOutlet',},
    		{ path: 'auth/login', component: LoginComponent, outlet: 'authOutlet',},
    		{ path: 'auth/register', component: RegisterComponent, outlet: 'authOutlet',},
		
		
	//	]
	//}
];

export const AuthRoutes = RouterModule.forChild(authRoutes);