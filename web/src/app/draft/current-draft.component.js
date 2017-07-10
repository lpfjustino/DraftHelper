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
var version_service_1 = require("../services/version.service");
var draft_service_1 = require("./draft.service");
var CurrentDraftComponent = (function () {
    function CurrentDraftComponent(championService, draftService, versionService) {
        var _this = this;
        this.championService = championService;
        this.draftService = draftService;
        this.versionService = versionService;
        // Keeps the reference of DraftState enum
        this.states = draft_service_1.DraftState;
        this.currentVersion = "";
        this.champImgBaseURL = "";
        this.champions = [];
        this.currentState = this.states.T1B1;
        this.draft = this.draftService.getCurrentDraft();
        this.draftService.draftChange.subscribe(function (data) { return _this.draft = data; });
    }
    CurrentDraftComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.championService.getChampions()
            .subscribe(function (champions) { return _this.champions = champions; });
        this.versionService.getVersion()
            .subscribe(function (ver) {
            _this.currentVersion = ver;
            _this.champImgBaseURL = "http://ddragon.leagueoflegends.com/cdn/"
                + _this.currentVersion + "/img/champion/";
        });
    };
    ;
    CurrentDraftComponent.prototype.getStateFromDefinition = function (team, nr, isBan) {
        var stateName;
        if (isBan)
            stateName = "T" + team + "B" + nr;
        else
            stateName = "T" + team + "P" + nr;
        return draft_service_1.DraftState[stateName];
    };
    CurrentDraftComponent.prototype.setCurrentState = function (team, nr, isBan) {
        var state = this.getStateFromDefinition(team, nr, isBan);
        this.draftService.stateChanged(state);
    };
    CurrentDraftComponent.prototype.isRoleFulfilled = function (team, nr, isBan) {
        var state = this.getStateFromDefinition(team, nr, isBan);
        return this.draft[state] != undefined;
    };
    CurrentDraftComponent.prototype.getChampionOnRoleURL = function (team, nr, isBan) {
        var state = this.getStateFromDefinition(team, nr, isBan);
        return this.champImgBaseURL + this.draft[state].image.full;
    };
    CurrentDraftComponent.prototype.getPlaceholderURL = function (team, isBan) {
        if (isBan) {
            if (team == 1)
                return "resources/blue_team_ban.png";
            else
                return "resources/red_team_ban.png";
        }
        else {
            if (team == 1)
                return "resources/blue_team_pick.png";
            else
                return "resources/red_team_pick.png";
        }
    };
    CurrentDraftComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'current-draft',
            templateUrl: 'current-draft.component.html',
            styleUrls: ['current-draft.component.css']
        }),
        __metadata("design:paramtypes", [champion_service_1.ChampionService,
            draft_service_1.DraftService,
            version_service_1.VersionService])
    ], CurrentDraftComponent);
    return CurrentDraftComponent;
}());
exports.CurrentDraftComponent = CurrentDraftComponent;
//# sourceMappingURL=current-draft.component.js.map