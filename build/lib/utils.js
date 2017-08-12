"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var defaults_1 = require("./defaults");
function prepareBitbucketOptions(_a) {
    var team = _a.team, username = _a.username, password = _a.password;
    if (!team || !username || !password) {
        throw errors_1.Errors.InvalidBitbucketOptions((!team) ? 'Team-name' :
            (!username) ? 'Username' :
                (!password) ? 'Password' : '');
    }
    var options = defaults_1.defaults.bitbucket;
    options['username'] = username;
    options['password'] = password;
    options['team'] = team;
    return options;
}
exports.prepareBitbucketOptions = prepareBitbucketOptions;
function prepareTelegramOptions(_a) {
    var token = _a.token, chat_id = _a.chat_id;
    if (!token || !chat_id) {
        throw errors_1.Errors.InvalidTelegramOptions((!token) ? 'Bot token' :
            (!chat_id) ? 'Channel id' : '');
    }
    var options = defaults_1.defaults.telegram;
    options['chat_id'] = chat_id;
    options['token'] = token;
    return options;
}
exports.prepareTelegramOptions = prepareTelegramOptions;
//# sourceMappingURL=utils.js.map