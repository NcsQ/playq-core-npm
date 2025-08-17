"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
class Assert {
    constructor(page) {
        this.page = page;
    }
    async assertTitle(title) {
        await (0, test_1.expect)(this.page).toHaveTitle(title);
    }
    async assertTitleContains(title) {
        const pageTitle = await this.page.title();
        (0, test_1.expect)(pageTitle).toContain(title);
    }
    async assertURL(url) {
        await (0, test_1.expect)(this.page).toHaveURL(url);
    }
    async assertURLContains(title) {
        const pageURL = this.page.url();
        (0, test_1.expect)(pageURL).toContain(title);
    }
}
exports.default = Assert;
//# sourceMappingURL=assert.js.map