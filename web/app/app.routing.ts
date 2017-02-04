import { Routes, RouterModule } 	from '@angular/router';

import { HomePageComponent } 		from './walkthrough/home-page.component';
import { SummonerInfoComponent } 	from './auth/summoner/index';
import { LoginComponent } 			from './auth/login/index';
import { RegisterComponent } 		from './auth/register/index';
import { CurrentDraftComponent } 	from './draft/current-draft.component'

import { AuthGuard } from './auth/_guards/index';

const appRoutes: Routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomePageComponent },
    { path: 'summoner', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'draft', component: CurrentDraftComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);