"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaywrightWrapper {
    constructor(page) {
        this.page = page;
    }
    async goto(url) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }
    async waitAndClick(locator) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }
    async navigateTo(link) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ]);
    }
}
exports.default = PlaywrightWrapper;
//# sourceMappingURL=PlaywrightWrappers.js.map