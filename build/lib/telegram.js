"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var texts = require("./datas");
var Bot = require("node-telegram-bot-api");
var Telegram = (function () {
    function Telegram(options, endpoints) {
        this.options = options;
        this.endpoints = endpoints;
        this.native = new Bot(this.options.token, this.options.state);
    }
    Telegram.prototype.sendEvents = function (_a) {
        var event = _a.event, repository = _a.repository, user = _a.user;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var username, header, repo, commits, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = user.last_name === '' ? user.username : user.last_name + " " + user.first_name;
                        header = "<a href=\"" + this.endpoints.base_url + "/" + user.username + "\"> " + username + "</a>  at  " + event.create_time + " " + texts['e' + event.name];
                        repo = "Repository: <a href=\"" + this.endpoints.base_url + "/" + this.endpoints.team + "/" + repository.slug + "\"> " + repository.name + "</a>";
                        return [4 /*yield*/, this.prepareCommits(event.description)];
                    case 1:
                        commits = _a.sent();
                        message = header + "\n" + repo + "\n" + (commits ? commits : "");
                        return [4 /*yield*/, this.send(message)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Telegram.prototype.send = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.native.sendMessage(this.options.chat_id, message, this.options.message_options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Telegram.prototype.prepareCommits = function (description) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!description)
                    description = {};
                return [2 /*return*/, new Promise(function (done, fail) {
                        if (!description.commits || description.commits && !description.commits.length) {
                            return done(null);
                        }
                        else {
                            var index_1 = 0;
                            var commits = description.commits.reverse()
                                .map(function (commit) { return "<pre>" + ++index_1 + ". " + commit.description + "</pre>"; }).join('\n');
                            done("Commits:\n" + commits);
                        }
                    })];
            });
        });
    };
    return Telegram;
}());
exports.Telegram = Telegram;
//# sourceMappingURL=telegram.js.map