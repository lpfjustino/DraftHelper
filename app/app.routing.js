"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_page_component_1 = require("./walkthrough/home-page.component");
var current_draft_component_1 = require("./draft/current-draft.component");
var appRoutes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: home_page_component_1.HomePageComponent, pathMatch: 'full' },
    //{ path: 'summoner', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    //{ path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },
    { path: 'draft', component: current_draft_component_1.CurrentDraftComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.AppRoutes = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map