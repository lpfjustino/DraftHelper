"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var material_1 = require("@angular/material");
// Main app components
var app_component_1 = require("./app.component");
var current_draft_component_1 = require("./draft/current-draft.component");
var champion_list_component_1 = require("./champions/champion-list.component");
var home_page_component_1 = require("./walkthrough/home-page.component");
// App services
var champion_service_1 = require("./champions/champion.service");
var draft_service_1 = require("./draft/draft.service");
var version_service_1 = require("./services/version.service");
var statistics_service_1 = require("./engine/services/statistics.service");
// Authentication imports
var app_routing_module_1 = require("./app-routing.module");
var auth_routing_module_1 = require("./auth/auth-routing.module");
var index_1 = require("./auth/_directives/index");
// Authentication components
var auth_component_1 = require("./auth/auth.component");
var index_2 = require("./auth/summoner/index");
var index_3 = require("./auth/login/index");
var index_4 = require("./auth/register/index");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                current_draft_component_1.CurrentDraftComponent,
                champion_list_component_1.ChampionListComponent,
                // Authentication components
                auth_component_1.AuthComponent,
                index_1.MyAlertComponent,
                index_2.SummonerInfoComponent,
                home_page_component_1.HomePageComponent,
                index_3.LoginComponent,
                index_4.RegisterComponent,
                auth_component_1.AuthComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                material_1.MaterialModule,
                auth_routing_module_1.AuthRoutingModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [
                champion_service_1.ChampionService,
                draft_service_1.DraftService,
                version_service_1.VersionService,
                statistics_service_1.StatisticsService
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
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map