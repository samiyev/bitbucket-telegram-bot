export declare function prepareBitbucketOptions({team, username, password}: {
    team: any;
    username: any;
    password: any;
}): {
    repositories_url: string;
    events_url: string;
    base_url: string;
    event_name: string;
    event_skip: string;
    event_limit: string;
};
export declare function prepareTelegramOptions({token, chat_id}: {
    token: any;
    chat_id: any;
}): {
    state: {
        polling: boolean;
    };
    message_options: {
        parse_mode: string;
        disable_web_page_preview: boolean;
    };
};
