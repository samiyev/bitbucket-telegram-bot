import {prepareBitbucketOptions, prepareTelegramOptions} from "./utils";
import {Errors} from "./errors";
import {Counter} from "./counter";
import {defaults} from "./defaults";
import {Telegram} from "./telegram";
import {Bitbucket} from "./bitbucket";
import {Controller} from "./controller";

export class Daemon {
    static counter;
    static telegram;
    static bitbucket;
    private controller: any;

    constructor(schedule, bitbucket, telegram, counter) {
        if (!counter) counter = defaults.counter;
        if (!schedule) schedule = defaults.schedule;
        if (!bitbucket) {
            throw Errors.TelegramOptionsNotFound();
        }
        if (!telegram) {
            throw Errors.BitbucketOptionsNotFound();
        }
        this.onInit(schedule, bitbucket, telegram, counter);
    }

    onInit(schedule, bitbucket, telegram, counter) {
        telegram = prepareTelegramOptions(telegram);
        bitbucket = prepareBitbucketOptions(bitbucket);

        Daemon.counter = new Counter(counter);
        Daemon.bitbucket = new Bitbucket(bitbucket);
        Daemon.telegram = new Telegram(telegram, bitbucket);

        this.controller = new Controller(
            Daemon.counter,
            Daemon.telegram,
            Daemon.bitbucket,
            schedule
        );
    }

    onExecute() {
        return this.controller.onExecute();
    }
}