export declare class Counter {
    private options;
    private reviseDatas;
    constructor(options: any);
    onInit(): void;
    revise(input: any, count: any): Promise<{
        skip: number;
        limit: any;
    } | {
        skip: any;
        limit: number;
    }>;
    update(input: any, count: any): Promise<void>;
    open(): Promise<void>;
    close(): Promise<void>;
    reset(): Promise<void>;
}
