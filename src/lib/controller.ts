export class Controller {
    private timerId: any;

    constructor(private counter,
                private telegram,
                private bitbucket,
                private options) {
    }

    async onExecute() {
        if (this.timerId) clearTimeout(this.timerId);
        try {
            await this.counter.open();

            let { repositories } = await this.bitbucket.getRepositories();
            console.log(repositories.length);
            for (let repo of repositories) {

                let { count } = await this.bitbucket.getEventsCount(repo);
                let { skip, limit } = await this.counter.revise(repo, count);

                if (limit === 0) continue;
                let { events } = await this.bitbucket.getEvents(repo, skip, limit);
                if (!events || events && !events.length)continue;

                for (let event of events.reverse()) {
                    let prepared = <any>await this.prepareSendedEvents(event);
                    await this.telegram.sendEvents(prepared);
                }

                await this.counter.update(repo, events.length);
            }

            await this.counter.close();
            this.timerId = setTimeout(() => this.onExecute(), this.options.interval);
        }
        catch (error) {
            await this.counter.close();
            throw error;
        }
    }

    async prepareSendedEvents({ description, repository, user, event, utc_created_on }) {
        return {
            event: {
                name: event,
                description,
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
        };

        function printDate(date) {
            let now = new Date(date);
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const hour = now.getHours();
            const min = now.getMinutes();
            return year
                + '.' + pref(month)
                + '.' + pref(day)
                + ' ' + pref(hour)
                + ':' + pref(min);

            function pref(number) {
                return (number < 10) ? '0' + number : number;
            }
        }
    }
}