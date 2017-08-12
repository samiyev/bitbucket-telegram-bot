"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = (function () {
    function Errors() {
    }
    Errors.TelegramOptionsNotFound = function () {
        return new Error('Telegram options not found.');
    };
    Errors.BitbucketOptionsNotFound = function () {
        return new Error('Telegram options not found.');
    };
    Errors.InvalidBitbucketOptions = function (option) {
        return new Error("Invalid Bitbucket options " + (option || ''));
    };
    Errors.InvalidTelegramOptions = function (option) {
        return new Error("Invalid Telegram options " + (option || ''));
    };
    return Errors;
}());
exports.Errors = Errors;
//# sourceMappingURL=errors.js.map