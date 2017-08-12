export const defaults = {
    schedule: { interval: 59 * 1000 + 99 },
    bitbucket: {
        repositories_url: 'http://api.bitbucket.org/1.0/users',
        events_url: 'http://api.bitbucket.org/1.0/repositories',
        base_url: 'https://bitbucket.org',
        event_name: 'events?',
        event_skip: 'start',
        event_limit: 'limit'
    },
    telegram: {
        state: { polling: true },
        message_options: {
            parse_mode: 'html',
            disable_web_page_preview: true
        }
    },
    counter: { path: `${__dirname}/counter.json` }
};