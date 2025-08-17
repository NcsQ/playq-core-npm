import { Logger } from 'winston';
export declare const logFixture: {
    init(scenarioName: string): void;
    get(): Logger;
    setLogger(log: Logger): void;
    getLogger(): Logger;
    attach(name: string, data: Buffer, type?: string): Promise<void>;
};
//# sourceMappingURL=logFixture.d.ts.map