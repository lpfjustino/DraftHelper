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
var Rx_1 = require("rxjs/Rx");
var DraftService = (function () {
    function DraftService(championService) {
        this.championService = championService;
        // Keeps the reference of DraftState enum
        this.states = DraftState;
        this.draftChange = new Rx_1.Subject();
        this.draft = {};
        this.champions = [];
        this.currentState = this.states.T1B1;
        // Sets every ban and pick as undefined
        for (var state in this.states) {
            this.draft[state] = undefined;
        }
    }
    DraftService.prototype.getCurrentDraft = function () {
        return this.draft;
    };
    DraftService.prototype.selected = function (id) {
        var champ = this.championService.getChampion(id);
        this.championSelected(champ);
    };
    DraftService.prototype.championSelected = function (champ) {
        this.draft[this.currentState] = champ;
        this.draftChange.next(this.draft);
    };
    DraftService.prototype.stateChanged = function (state) {
        this.currentState = state;
    };
    DraftService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [champion_service_1.ChampionService])
    ], DraftService);
    return DraftService;
}());
exports.DraftService = DraftService;
var DraftState;
(function (DraftState) {
    DraftState[DraftState["T1B1"] = 0] = "T1B1";
    DraftState[DraftState["T1B2"] = 1] = "T1B2";
    DraftState[DraftState["T1B3"] = 2] = "T1B3";
    DraftState[DraftState["T1P1"] = 3] = "T1P1";
    DraftState[DraftState["T1P2"] = 4] = "T1P2";
    DraftState[DraftState["T1P3"] = 5] = "T1P3";
    DraftState[DraftState["T1P4"] = 6] = "T1P4";
    DraftState[DraftState["T1P5"] = 7] = "T1P5";
    DraftState[DraftState["T2B1"] = 8] = "T2B1";
    DraftState[DraftState["T2B2"] = 9] = "T2B2";
    DraftState[DraftState["T2B3"] = 10] = "T2B3";
    DraftState[DraftState["T2P1"] = 11] = "T2P1";
    DraftState[DraftState["T2P2"] = 12] = "T2P2";
    DraftState[DraftState["T2P3"] = 13] = "T2P3";
    DraftState[DraftState["T2P4"] = 14] = "T2P4";
    DraftState[DraftState["T2P5"] = 15] = "T2P5";
})(DraftState = exports.DraftState || (exports.DraftState = {}));
;
//# sourceMappingURL=draft.service.js.map