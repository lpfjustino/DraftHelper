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
var champion_service_1 = require("./champion.service");
var version_service_1 = require("../services/version.service");
var draft_service_1 = require("../draft/draft.service");
var ChampionListComponent = (function () {
    function ChampionListComponent(championService, draftService, versionService) {
        this.championService = championService;
        this.draftService = draftService;
        this.versionService = versionService;
        this.champions = [];
        this.currentVersion = "";
        this.champImgBaseURL = "";
    }
    ChampionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.versionService.getVersion()
            .subscribe(function (ver) {
            _this.currentVersion = ver;
            _this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
                + _this.currentVersion + "/img/champion/";
        });
        this.championService.getChampions()
            .subscribe(function (champions) { return _this.champions = champions; });
    };
    ;
    ChampionListComponent.prototype.selected = function (id) {
        this.draftService.selected(id);
    };
    ChampionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'champion-list',
            templateUrl: 'champion-list.component.html',
            styleUrls: ['champion-list.component.css']
        }),
        __metadata("design:paramtypes", [champion_service_1.ChampionService,
            draft_service_1.DraftService,
            version_service_1.VersionService])
    ], ChampionListComponent);
    return ChampionListComponent;
}());
exports.ChampionListComponent = ChampionListComponent;
//# sourceMappingURL=champion-list.component.js.map