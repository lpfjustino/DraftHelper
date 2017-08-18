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
var http_1 = require("@angular/http");
var version_service_1 = require("../services/version.service");
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
var ChampionService = (function () {
    function ChampionService(http, versionService) {
        this.http = http;
        this.versionService = versionService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.championsUrl = '';
        this.currentVersion = '';
        this.champions = [];
    }
    ChampionService.prototype.getChampions = function () {
        var _this = this;
        this.versionService
            .getVersion()
            .subscribe(function (ver) {
            _this.currentVersion = ver;
            _this.championsUrl = 'http://ddragon.leagueoflegends.com/cdn/'
                + ver
                + '/data/en_US/champion.json';
            _this.http.get(_this.championsUrl)
                .subscribe(function (response) {
                var champsObject = response.json().data;
                // Convert the incoming Object to Array
                Object.keys(champsObject).map(function (key) { return _this.champions.push(champsObject[key]); });
                _this.championsObserver.next(_this.champions);
            });
        });
        return new Observable_1.Observable(function (observer) { return _this.championsObserver = observer; });
    };
    ChampionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    ChampionService.prototype.getChampion = function (id) {
        return this.champions.filter(function (champ) { return champ.id == id; })[0];
    };
    ChampionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, version_service_1.VersionService])
    ], ChampionService);
    return ChampionService;
}());
exports.ChampionService = ChampionService;
//# sourceMappingURL=champion.service.js.map