"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request').defaults({ jar: true });
var Bitbucket = (function () {
    function Bitbucket(options) {
        this.options = options;
        this.awaited = new Map();
        this.count = 0;
    }
    Bitbucket.prototype.getRepositories = function () {
        var _this = this;
        return new Promise(function (done, fail) {
            request.get({
                url: _this.options.repositories_url + "/" + _this.options.team,
                auth: {
                    user: _this.options.username,
                    pass: _this.options.password,
                    sendImmediately: true
                }
            }, function (error, body, result) {
                if (error || !result) {
                    return fail({
                        error: JSON.parse(error), result: result ? JSON.parse(result) : null
                    });
                }
                done(JSON.parse(result));
            });
        });
    };
    Bitbucket.prototype.getEvents = function (repo, skip, limit) {
        var _this = this;
        return new Promise(function (done, fail) {
            request.get({
                url: _this.options.events_url + "/" + _this.options.team + "/" + repo.slug + "/" + _this.options.event_name + _this.options.event_limit + "=" + limit,
                auth: {
                    user: _this.options.username,
                    pass: _this.options.password,
                    sendImmediately: true
                }
            }, function (error, body, result) {
                if (error || !result) {
                    return fail({
                        error: JSON.parse(error), result: result ? JSON.parse(result) : null
                    });
                }
                done(JSON.parse(result));
            });
        });
    };
    Bitbucket.prototype.getEventsCount = function (repo) {
        var _this = this;
        return new Promise(function (done, fail) {
            request.get({
                url: _this.options.events_url + "/" + _this.options.team + "/" + repo.slug + "/" + _this.options.event_name + _this.options.event_limit + "=0",
                auth: {
                    user: _this.options.username,
                    pass: _this.options.password,
                    sendImmediately: true
                }
            }, function (error, body, result) {
                if (error || !result) {
                    return fail({
                        error: JSON.parse(error), result: result ? JSON.parse(result) : null
                    });
                }
                done(JSON.parse(result));
            });
        });
    };
    return Bitbucket;
}());
exports.Bitbucket = Bitbucket;
//# sourceMappingURL=bitbucket.js.map