import * as texts from "./datas";
import * as Bot from "node-telegram-bot-api";

export class Telegram {
    private native: any;

    constructor(private options, private endpoints) {
        this.native = new Bot(this.options.token, this.options.state);
    }

    async sendEvents({ event, repository, user }) {
        let username = user.last_name === '' ? user.username : user.last_name + " " + user.first_name;
        let header = `<a href="${this.endpoints.base_url}/${user.username}"> ${username}</a>  at  ${event.create_time} ${texts['e' + event.name]}`;
        let repo = `Repository: <a href="${this.endpoints.base_url}/${this.endpoints.team}/${repository.slug}"> ${repository.name}</a>`;
        let commits = await this.prepareCommits(event.description);
        let message = `${header}\n${repo}\n${commits ? commits : ""}`;
        await this.send(message);
    }

    async send(message) {
        await this.native.sendMessage(this.options.chat_id, message, this.options.message_options);
    }

    async prepareCommits(description) {
        if (!description) description = {};
        return new Promise((done, fail) => {
            if (!description.commits || description.commits && !description.commits.length) {
                return done(null);
            }
            else {
                let index = 0;
                let commits = description.commits.reverse()
                    .map(commit => `<pre>${++index}. ${commit.description}</pre>`).join('\n');
                done("Commits:\n" + commits);
            }
        });
    }
}