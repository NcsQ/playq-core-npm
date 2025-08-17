"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webFixture = void 0;
const browserManager_1 = require("../browsers/browserManager");
const runnerType_1 = require("../util/runnerType");
const pages = new Map();
const frames = new Map();
let currentPage;
let currentFrame;
let logger;
let currentPageName = "main";
let browser;
let context;
let _world = null;
let smartIQData = [];
exports.webFixture = {
    pages,
    frames,
    async launchBrowser() {
        browser = await (0, browserManager_1.invokeBrowser)();
    },
    async newContext(options) {
        if (!options) {
            options = {
                recordVideo: {
                    dir: "test-results/videos",
                },
            };
        }
        context = await browser.newContext(options);
        return context;
    },
    async newPage(name = "main") {
        const page = await context.newPage();
        pages.set(name, page);
        currentPage = page;
        currentPageName = name;
        return page;
    },
    getBrowser() {
        return browser;
    },
    getContext() {
        return context;
    },
    getCurrentPage() {
        return currentPage;
    },
    setCurrentPage(name) {
        currentPage = pages.get(name);
        currentPageName = name;
    },
    async closeContext() {
        if (context) {
            await context.close();
        }
    },
    async closeAll() {
        await (context === null || context === void 0 ? void 0 : context.close());
        await (browser === null || browser === void 0 ? void 0 : browser.close());
    },
    setWorld(world) {
        _world = world;
    },
    getWorld() {
        if ((0, runnerType_1.isPlaywrightRunner)()) {
            console.warn('⚠️ Skipping getWorld() in Playwright Runner');
            return null;
        }
        if (!_world) {
            throw new Error("❌ Cucumber World context not set. Did you forget to call webFixture.setWorld(this) in your step?");
        }
        return _world;
    },
    // other frame helpers remain the same
    setPlaywrightPage(page) {
        console.log('✅ Playwright page set in webFixture');
        currentPage = page;
    },
    // SmartIQ Imeplementation
    getSmartIQData() {
        return smartIQData;
    },
    setSmartIQData(data) {
        smartIQData = data;
    }
};
async function createContextWithDefaults(scenarioName) {
    const ctx = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await ctx.tracing.start({
        name: scenarioName,
        title: scenarioName,
        sources: true,
        screenshots: true,
        snapshots: true,
    });
    return ctx;
}
// import { Page, Frame } from "@playwright/test";
// import { Logger } from "winston";
// import { invokeBrowser } from "@helper/browsers/browserManager";
// const pages = new Map<string, Page>();
// const frames = new Map<string, Frame>();
// let currentPage: Page | undefined;
// let currentFrame: Frame | undefined;
// let logger: Logger;
// let currentPageName: string = "main";
// export const uiFixture = {
//     pages,
//     frames,
//     setPage(page: Page) {
//         pages.set(currentPageName, page);
//     },
//     setPageWithName(name: string, page: Page) {
//         pages.set(name, page);
//         currentPage = page;
//         currentPageName = name;
//     },
//     getPage(name: string): Page | undefined {
//         return pages.get(name);
//     },
//     setCurrentPage(name: string) {
//         currentPage = pages.get(name);
//         currentPageName = name;
//     },
//     getCurrentPage(): Page | undefined {
//         return currentPage;
//     },
//     getCurrentPageName(): string {
//         return currentPageName;
//     },
//     setFrame(name: string, frame: Frame) {
//         frames.set(name, frame);
//         currentFrame = frame;
//     },
//     getFrame(name: string): Frame | undefined {
//         return frames.get(name);
//     },
//     setCurrentFrame(name: string) {
//         currentFrame = frames.get(name);
//     },
//     getCurrentFrame(): Frame | undefined {
//         return currentFrame;
//     },
//     setLogger(log: Logger) {
//         logger = log;
//     },
//     getLogger(): Logger {
//         return logger;
//     }
// };
// import { Page } from "@playwright/test";
// import { Logger } from "winston";
// export const fixture = {
//     // @ts-ignore
//     page: undefined as Page,
//     logger: undefined as Logger
// }
//# sourceMappingURL=webFixture.js.map