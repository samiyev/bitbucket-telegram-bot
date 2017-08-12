export declare class Controller {
    private counter;
    private telegram;
    private bitbucket;
    private options;
    private timerId;
    constructor(counter: any, telegram: any, bitbucket: any, options: any);
    onExecute(): Promise<void>;
    prepareSendedEvents({description, repository, user, event, utc_created_on}: {
        description: any;
        repository: any;
        user: any;
        event: any;
        utc_created_on: any;
    }): Promise<{
        event: {
            name: any;
            description: any;
            create_time: string;
        };
        user: {
            avatar: any;
            username: any;
            last_name: any;
            first_name: any;
            display_name: any;
        };
        repository: {
            slug: any;
            name: any;
            owner: any;
            creator: any;
            language: any;
            private: any;
            create_time: string;
            last_update_time: string;
        };
    }>;
}
