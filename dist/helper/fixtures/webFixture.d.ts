import { Browser, BrowserContext, Page, Frame } from "@playwright/test";
export declare const webFixture: {
    pages: Map<string, Page>;
    frames: Map<string, Frame>;
    launchBrowser(): Promise<void>;
    newContext(options?: Parameters<Browser["newContext"]>[0]): Promise<BrowserContext>;
    newPage(name?: string): Promise<Page>;
    getBrowser(): Browser;
    getContext(): BrowserContext;
    getCurrentPage(): Page | undefined;
    setCurrentPage(name: string): void;
    closeContext(): Promise<void>;
    closeAll(): Promise<void>;
    setWorld(world: any): void;
    getWorld(): any;
    setPlaywrightPage(page: Page): void;
    getSmartIQData(): any[];
    setSmartIQData(data: any[]): void;
};
//# sourceMappingURL=webFixture.d.ts.map