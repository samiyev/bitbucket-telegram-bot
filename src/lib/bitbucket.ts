const request = require('request').defaults({ jar: true });

export class Bitbucket {
    private awaited = new Map();
    private count = 0;

    constructor(private options) {
    }

    getRepositories() {
        return new Promise((done, fail) => {
            request.get({
                url: `${this.options.repositories_url}/${this.options.team}`,
                auth: {
                    user: this.options.username,
                    pass: this.options.password,
                    sendImmediately: true
                }
            }, (error, body, result) => {
                if (error || !result) {
                    return fail({
                        error: JSON.parse(error), result: result ? JSON.parse(result) : null
                    })
                }
                done(JSON.parse(result));
            });
        });
    }

    getEvents(repo, skip, limit) {
        return new Promise((done, fail) => {
            request.get({
                url: `${this.options.events_url}/${this.options.team}/${repo.slug}/${this.options.event_name}${this.options.event_limit}=${limit}`,
                auth: {
                    user: this.options.username,
                    pass: this.options.password,
                    sendImmediately: true
                }
            }, (error, body, result) => {
                if (error || !result) {
                    return fail({
                        error: JSON.parse(error), result: result ? JSON.parse(result) : null
                    })
                }
                done(JSON.parse(result));
            });
        });
    }

    getEventsCount(repo) {
        return new Promise((done, fail) => {
            request.get({
                url: `${this.options.events_url}/${this.options.team}/${repo.slug}/${this.options.event_name}${this.options.event_limit}=0`,
                auth: {
                    user: this.options.username,
                    pass: this.options.password,
                    sendImmediately: true
                }
            }, (error, body, result) => {
                if (error || !result) {
                    return fail({
                        error: JSON.parse(error), result: result ? JSON.parse(result) : null
                    })
                }
                done(JSON.parse(result));
            });
        });
    }
}