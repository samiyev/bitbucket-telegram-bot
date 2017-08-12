"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var errors_1 = require("./errors");
var counter_1 = require("./counter");
var defaults_1 = require("./defaults");
var telegram_1 = require("./telegram");
var bitbucket_1 = require("./bitbucket");
var controller_1 = require("./controller");
var Daemon = (function () {
    function Daemon(schedule, bitbucket, telegram, counter) {
        if (!counter)
            counter = defaults_1.defaults.counter;
        if (!schedule)
            schedule = defaults_1.defaults.schedule;
        if (!bitbucket) {
            throw errors_1.Errors.TelegramOptionsNotFound();
        }
        if (!telegram) {
            throw errors_1.Errors.BitbucketOptionsNotFound();
        }
        this.onInit(schedule, bitbucket, telegram, counter);
    }
    Daemon.prototype.onInit = function (schedule, bitbucket, telegram, counter) {
        telegram = utils_1.prepareTelegramOptions(telegram);
        bitbucket = utils_1.prepareBitbucketOptions(bitbucket);
        Daemon.counter = new counter_1.Counter(counter);
        Daemon.bitbucket = new bitbucket_1.Bitbucket(bitbucket);
        Daemon.telegram = new telegram_1.Telegram(telegram, bitbucket);
        this.controller = new controller_1.Controller(Daemon.counter, Daemon.telegram, Daemon.bitbucket, schedule);
    };
    Daemon.prototype.onExecute = function () {
        return this.controller.onExecute();
    };
    return Daemon;
}());
exports.Daemon = Daemon;
//# sourceMappingURL=daemon.js.map