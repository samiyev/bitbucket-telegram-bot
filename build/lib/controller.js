"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Controller = (function () {
    function Controller(counter, telegram, bitbucket, options) {
        this.counter = counter;
        this.telegram = telegram;
        this.bitbucket = bitbucket;
        this.options = options;
    }
    Controller.prototype.onExecute = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repositories, _i, repositories_1, repo, count, _a, skip, limit, events, _b, _c, event, prepared, error_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.timerId)
                            clearTimeout(this.timerId);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 17, , 19]);
                        return [4 /*yield*/, this.counter.open()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.bitbucket.getRepositories()];
                    case 3:
                        repositories = (_d.sent()).repositories;
                        _i = 0, repositories_1 = repositories;
                        _d.label = 4;
                    case 4:
                        if (!(_i < repositories_1.length)) return [3 /*break*/, 15];
                        repo = repositories_1[_i];
                        return [4 /*yield*/, this.bitbucket.getEventsCount(repo)];
                    case 5:
                        count = (_d.sent()).count;
                        return [4 /*yield*/, this.counter.revise(repo, count)];
                    case 6:
                        _a = _d.sent(), skip = _a.skip, limit = _a.limit;
                        if (limit === 0)
                            return [3 /*break*/, 14];
                        return [4 /*yield*/, this.bitbucket.getEvents(repo, skip, limit)];
                    case 7:
                        events = (_d.sent()).events;
                        if (!events || events && !events.length)
                            return [3 /*break*/, 14];
                        _b = 0, _c = events.reverse();
                        _d.label = 8;
                    case 8:
                        if (!(_b < _c.length)) return [3 /*break*/, 12];
                        event = _c[_b];
                        return [4 /*yield*/, this.prepareSendedEvents(event)];
                    case 9:
                        prepared = _d.sent();
                        return [4 /*yield*/, this.telegram.sendEvents(prepared)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11:
                        _b++;
                        return [3 /*break*/, 8];
                    case 12: return [4 /*yield*/, this.counter.update(repo, events.length)];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14:
                        _i++;
                        return [3 /*break*/, 4];
                    case 15: return [4 /*yield*/, this.counter.close()];
                    case 16:
                        _d.sent();
                        this.timerId = setTimeout(function () { return _this.onExecute(); }, this.options.interval);
                        return [3 /*break*/, 19];
                    case 17:
                        error_1 = _d.sent();
                        return [4 /*yield*/, this.counter.close()];
                    case 18:
                        _d.sent();
                        throw error_1;
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    Controller.prototype.prepareSendedEvents = function (_a) {
        var description = _a.description, repository = _a.repository, user = _a.user, event = _a.event, utc_created_on = _a.utc_created_on;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            function printDate(date) {
                var now = new Date(date);
                var day = now.getDate();
                var month = now.getMonth() + 1;
                var year = now.getFullYear();
                var hour = now.getHours();
                var min = now.getMinutes();
                return year
                    + '.' + pref(month)
                    + '.' + pref(day)
                    + ' ' + pref(hour)
                    + ':' + pref(min);
                function pref(number) {
                    return (number < 10) ? '0' + number : number;
                }
            }
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, {
                        event: {
                            name: event,
                            description: description,
                            create_time: printDate(utc_created_on),
                        },
                        user: {
                            avatar: user.avatar,
                            username: user.username,
                            last_name: user.last_name,
                            first_name: user.first_name,
                            display_name: user.display_name
                        },
                        repository: {
                            slug: repository.slug,
                            name: repository.name,
                            owner: repository.owner,
                            creator: repository.creator,
                            language: repository.language,
                            private: repository.is_private,
                            create_time: printDate(repository.utc_created_on),
                            last_update_time: printDate(repository.utc_last_updated)
                        }
                    }];
            });
        });
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map