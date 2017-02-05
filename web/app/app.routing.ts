import { Routes, RouterModule } 	from '@angular/router';

import { HomePageComponent } 		from './walkthrough/home-page.component';
import { SummonerInfoComponent } 	from './auth/summoner/index';
import { LoginComponent } 			from './auth/login/index';
import { RegisterComponent } 		from './auth/register/index';
import { CurrentDraftComponent } 	from './draft/current-draft.component'

import { AuthGuard } 				from './auth/_guards/index';

const appRoutes: Routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    //{ path: 'summoner', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    //{ path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },
    { path: 'draft', component: CurrentDraftComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);