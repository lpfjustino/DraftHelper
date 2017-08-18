"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var champion_service_1 = require("../champions/champion.service");
var statistics_service_1 = require("../engine/services/statistics.service");
var engine_1 = require("../engine/engine");
var HomePageComponent = (function () {
    function HomePageComponent(championService, statsService) {
        var test = new engine_1.BaseChoice(championService);
        console.log(test);
        test.choose(3).subscribe(function (a) { return a.forEach(function (v) { return console.log(v.champ.name, v.score); }); });
        var test2 = new engine_1.GlobalWinrateDecorator(test, 5, statsService);
        console.log(test2);
        test2.choose(3).subscribe(function (a) { return a.forEach(function (v) { return console.log(v.champ.name, v.score); }); });
    }
    HomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-page',
            templateUrl: 'home-page.component.html',
        }),
        __metadata("design:paramtypes", [champion_service_1.ChampionService,
            statistics_service_1.StatisticsService])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=home-page.component.js.map