"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeBrowser = void 0;
const test_1 = require("@playwright/test");
const options = {
    headless: !true
};
const invokeBrowser = () => {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return test_1.chromium.launch(options);
        case "firefox":
            return test_1.firefox.launch(options);
        case "webkit":
            return test_1.webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!");
    }
};
exports.invokeBrowser = invokeBrowser;
//# sourceMappingURL=browserManager.js.map