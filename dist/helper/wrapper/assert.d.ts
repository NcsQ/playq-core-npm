import { Page } from "@playwright/test";
export default class Assert {
    private page;
    constructor(page: Page);
    assertTitle(title: string): Promise<void>;
    assertTitleContains(title: string): Promise<void>;
    assertURL(url: string): Promise<void>;
    assertURLContains(title: string): Promise<void>;
}
//# sourceMappingURL=assert.d.ts.map