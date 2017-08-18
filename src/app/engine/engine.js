"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var BaseChoice = (function () {
    function BaseChoice(championService) {
        this.championService = championService;
        this.weight = 0;
        this.options = [];
        this.optionsSubject = new Subject_1.Subject();
    }
    BaseChoice.prototype.getOptions = function () {
        var _this = this;
        if (this.options.length == 0) {
            var source = this.championService.getChampions().share();
            source.subscribe(function (champions) {
                if (_this.options.length != 0)
                    return; // <=== Looks bad!
                champions.forEach(function (champion) {
                    _this.options.push(new PickQuality(champion, 0));
                });
                _this.reevaluate();
                _this.optionsSubject.next(_this.options);
            });
            return this.optionsSubject.asObservable();
        }
        else
            return Observable_1.Observable.of(this.options);
    };
    BaseChoice.prototype.choose = function (n) {
        var chooseSubject = new Subject_1.Subject();
        this.getOptions().subscribe(function (options) {
            var chosen = n ? options.slice(0, n) : options.slice(0, 1);
            ;
            chooseSubject.next(chosen);
            chooseSubject.complete();
        });
        return chooseSubject.asObservable();
    };
    BaseChoice.prototype.reevaluate = function () {
        // The base choice does not change any priorities
        this.getOptions().subscribe(function (options) {
            options.forEach(function (opt) { opt.score += opt.champ.stats.armor; });
            options.sort(function (a, b) { return b.score - a.score; });
        });
    };
    return BaseChoice;
}());
exports.BaseChoice = BaseChoice;
var ChoiceEngineDecorator = (function () {
    function ChoiceEngineDecorator(pickAppraiser, weight, statsService) {
        this.statsService = statsService;
        this.decoratedAppraisal = pickAppraiser;
        this.weight = weight;
        this.options = pickAppraiser.options;
    }
    ChoiceEngineDecorator.prototype.getOptions = function () {
        return this.decoratedAppraisal.getOptions();
    };
    ChoiceEngineDecorator.prototype.choose = function (n) {
        return this.decoratedAppraisal.choose(n);
    };
    ChoiceEngineDecorator.prototype.reevaluate = function () {
        this.decoratedAppraisal.reevaluate();
    };
    return ChoiceEngineDecorator;
}());
var GlobalWinrateDecorator = (function (_super) {
    __extends(GlobalWinrateDecorator, _super);
    function GlobalWinrateDecorator(pickAppraiser, weight, statsService) {
        var _this = _super.call(this, pickAppraiser, weight, statsService) || this;
        _this.reevaluate();
        return _this;
    }
    GlobalWinrateDecorator.prototype.choose = function (n) {
        return _super.prototype.choose.call(this, n);
    };
    GlobalWinrateDecorator.prototype.reevaluate = function () {
        // The base choice does not change any priorities
        this.getOptions().subscribe(function (options) {
            options.forEach(function (opt) {
                opt.score += opt.champ.stats.hp;
                options.sort(function (a, b) { return b.score - a.score; });
            });
        });
    };
    return GlobalWinrateDecorator;
}(ChoiceEngineDecorator));
exports.GlobalWinrateDecorator = GlobalWinrateDecorator;
var PickQuality = (function () {
    function PickQuality(champ, score) {
        this.champ = champ;
        this.score = score;
    }
    return PickQuality;
}());
//# sourceMappingURL=engine.js.map