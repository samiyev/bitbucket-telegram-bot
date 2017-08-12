export declare class Bitbucket {
    private options;
    private awaited;
    private count;
    constructor(options: any);
    getRepositories(): Promise<{}>;
    getEvents(repo: any, skip: any, limit: any): Promise<{}>;
    getEventsCount(repo: any): Promise<{}>;
}
