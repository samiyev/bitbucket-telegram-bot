export declare const defaults: {
    schedule: {
        interval: number;
    };
    bitbucket: {
        repositories_url: string;
        events_url: string;
        base_url: string;
        event_name: string;
        event_skip: string;
        event_limit: string;
    };
    telegram: {
        state: {
            polling: boolean;
        };
        message_options: {
            parse_mode: string;
            disable_web_page_preview: boolean;
        };
    };
    counter: {
        path: string;
    };
};
