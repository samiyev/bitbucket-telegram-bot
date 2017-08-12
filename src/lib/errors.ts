export class Errors {
    static TelegramOptionsNotFound() {
        return new Error('Telegram options not found.')
    }

    static BitbucketOptionsNotFound() {
        return new Error('Telegram options not found.')
    }

    static InvalidBitbucketOptions(option?) {
        return new Error(`Invalid Bitbucket options ${option || ''}`);
    }

    static InvalidTelegramOptions(option?) {
        return new Error(`Invalid Telegram options ${option || ''}`);
    }
}