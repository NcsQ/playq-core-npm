import { Page } from "@playwright/test";
export default class PlaywrightWrapper {
    private page;
    constructor(page: Page);
    goto(url: string): Promise<void>;
    waitAndClick(locator: string): Promise<void>;
    navigateTo(link: string): Promise<void>;
}
//# sourceMappingURL=PlaywrightWrappers.d.ts.map