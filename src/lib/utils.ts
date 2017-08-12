import {Errors} from "./errors";
import {defaults} from "./defaults";

export function prepareBitbucketOptions({ team, username, password }) {
    if (!team || !username || !password) {
        throw Errors.InvalidBitbucketOptions(
            (!team) ? 'Team-name' :
                (!username) ? 'Username' :
                    (!password) ? 'Password' : '');
    }
    const options = defaults.bitbucket;
    options['username'] = username;
    options['password'] = password;
    options['team'] = team;
    return options;
}

export function prepareTelegramOptions({ token, chat_id }) {
    if (!token || !chat_id) {
        throw Errors.InvalidTelegramOptions(
            (!token) ? 'Bot token' :
                (!chat_id) ? 'Channel id' : '');
    }
    const options = defaults.telegram;
    options['chat_id'] = chat_id;
    options['token'] = token;
    return options;
}