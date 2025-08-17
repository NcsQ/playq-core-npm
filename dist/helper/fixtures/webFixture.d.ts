import { Browser, BrowserContext, Page, Frame } from "@playwright/test";
export declare const webFixture: {
    pages: Map<string, Page>;
    frames: Map<string, Frame>;
    launchBrowser(): Promise<void>;
    /**
     * Take a screenshot of the current page. Throws if no page is set.
     */
    screenshotCurrentPage(options?: Parameters<Page["screenshot"]>[0]): Promise<any>;
    newContext(options?: Parameters<Browser["newContext"]>[0]): Promise<BrowserContext>;
    newPage(name?: string): Promise<Page>;
    getBrowser(): Browser;
    getContext(): BrowserContext;
    getCurrentPage(): Page | undefined;
    hasCurrentPage(): boolean;
    requireCurrentPage(): Page;
    setCurrentPage(name: string): void;
    closeContext(): Promise<void>;
    closeAll(): Promise<void>;
    setWorld(world: any): void;
    getWorld(): any;
    setPlaywrightPage(page: Page): void;
    getSmartIQData(): any[];
    setSmartIQData(data: any[]): void;
    /**
     * Convenience helper to fetch the current page's recorded video path if available.
     * Returns null when video recording is disabled or page/context not initialized.
     */
    getCurrentPageVideoPath(): Promise<string | null>;
};
//# sourceMappingURL=webFixture.d.ts.map