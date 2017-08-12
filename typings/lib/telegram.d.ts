export declare class Telegram {
    private options;
    private endpoints;
    private native;
    constructor(options: any, endpoints: any);
    sendEvents({event, repository, user}: {
        event: any;
        repository: any;
        user: any;
    }): Promise<void>;
    send(message: any): Promise<void>;
    prepareCommits(description: any): Promise<{}>;
}
