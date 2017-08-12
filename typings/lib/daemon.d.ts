export declare class Daemon {
    static counter: any;
    static telegram: any;
    static bitbucket: any;
    private controller;
    constructor(schedule: any, bitbucket: any, telegram: any, counter: any);
    onInit(schedule: any, bitbucket: any, telegram: any, counter: any): void;
    onExecute(): any;
}
