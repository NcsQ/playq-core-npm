export declare function dataTest<T extends Record<string, any>>(label: string, dataSource: T[] | {
    file: string;
    filter?: string;
    sheet?: string;
    testType?: string;
    suffix?: string;
}, callback: (args: {
    row: T;
    page?: any;
}) => Promise<void>): void;
//# sourceMappingURL=dataTest.d.ts.map