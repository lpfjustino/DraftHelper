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
//import 'rxjs/add/operator/toPromise';
require("rxjs/Rx");
var Observable_1 = require("rxjs/Observable");
var VersionService = (function () {
    function VersionService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.currentVersion = "";
    }
    VersionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    VersionService.prototype.getVersion = function () {
        var versionURL = "https://global.api.pvp.net/api/lol/static-data/br/v1.2/versions?api_key=RGAPI-d50dbdf8-50fe-4e4c-8d6c-90c5d6cb0394";
        return this.http.get(versionURL)
            .map(function (response) { return response.json()[0]; })
            .catch(this.handleError);
    };
    VersionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], VersionService);
    return VersionService;
}());
exports.VersionService = VersionService;
//# sourceMappingURL=version.service.js.map