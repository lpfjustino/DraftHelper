"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./summoner/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var index_4 = require("./_guards/index");
var authRoutes = [
    {
        path: 'auth',
        outlet: 'authOutlet',
        component: index_1.SummonerInfoComponent,
        canActivate: [index_4.AuthGuard]
    },
    //	children: [
    //{ path: '', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    //{ path: 'summoner', component: SummonerInfoComponent, canActivate: [AuthGuard] },
    { path: 'auth/summoner', component: index_1.SummonerInfoComponent, canActivate: [index_4.AuthGuard], outlet: 'authOutlet', },
    { path: 'auth/login', component: index_2.LoginComponent, outlet: 'authOutlet', },
    { path: 'auth/register', component: index_3.RegisterComponent, outlet: 'authOutlet', },
];
exports.AuthRoutes = router_1.RouterModule.forChild(authRoutes);
//# sourceMappingURL=auth.routing.js.map