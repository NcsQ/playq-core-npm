"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.webLocResolver = webLocResolver;
const _playq_1 = require("@playq");
// import { smartAI} from "@extend/engines/smartAi/smartAiEngine";
async function webLocResolver(type, selector, pageArg, overridePattern, timeout, smartAiRefresh = '') {
    var _a, _b, _c, _d;
    console.log(`🔍 Resolving locator: ${selector}`);
    const page = pageArg;
    const isPlaywrightPrefixed = selector.startsWith("xpath=") || selector.startsWith("xpath =") || selector.startsWith("css=") || selector.startsWith("css =");
    if (isPlaywrightPrefixed) {
        // const rawSelector = selector.replace(/^xpath=|^css=|^xpath =|^xpath=\\|^xpath =\\|^css =/, "");
        // Normalize escaped forward slashes first, then remove prefix
        const rawSelector = selector
            .replace(/^xpath=\\|^xpath =\\/, "xpath=") // normalize `xpath=\` to `xpath=`
            .replace(/^xpath=|^xpath =|^css=|^css =/, "") // remove the actual prefix
            .replace(/\\\//g, "/"); // replace escaped slashes with normal ones
        console.log("📍 Detected Playwright-prefixed selector. Returning raw locator.");
        return page.locator(rawSelector);
    }
    const isPlaywrightChainedPrefixed = selector.startsWith("chain=") || selector.startsWith("chain =");
    if (isPlaywrightChainedPrefixed) {
        const rawSelector = selector.replace(/^chain=|^chain =/, "");
        console.log("📍 Detected Playwright-prefixed chained selector. Returning raw locator.");
        return page.locator(rawSelector);
    }
    const isXPath = selector.trim().startsWith("//") || selector.trim().startsWith("(");
    const isCSS = selector.includes(">") ||
        selector.startsWith(".") ||
        selector.includes("#");
    const isChained = selector.includes(">>");
    const isResourceLocator = selector.startsWith("loc.");
    if ((isXPath || isCSS || isChained) && !isResourceLocator) {
        console.log("📍 Detected XPath/CSS/Chained. Returning locator directly.");
        return page.locator(selector);
    }
    if (isResourceLocator) {
        const parts = selector.split(".");
        if (parts.length < 3) {
            throw new Error(`❌ Invalid locator format: "${selector}". Expected format: loc.(ts|json).<page>.<field>`);
        }
        const [, locType, pageName, fieldName] = parts;
        if (selector.startsWith("loc.json.")) {
            const [, , fileName, pageName, fieldName] = selector.split(".");
            const jsonLocatorMap = await Promise.resolve(`${`@resources/locators/loc-json/${fileName}.json`}`).then(s => __importStar(require(s)));
            const pageObj = jsonLocatorMap === null || jsonLocatorMap === void 0 ? void 0 : jsonLocatorMap[pageName];
            if (!pageObj)
                throw new Error(`❌ Page "${pageName}" not found in ${fileName}.json`);
            const locatorString = pageObj[fieldName];
            if (!locatorString)
                throw new Error(`❌ Field "${fieldName}" not found in ${fileName}.json[${pageName}]`);
            console.log(`🧩 Resolved locator string from loc.json.${fileName}.${pageName}.${fieldName} -> ${locatorString}`);
            return page.locator(await _playq_1.vars.replaceVariables(locatorString));
        }
        if (selector.startsWith("loc.ts.")) {
            const [, , fileName, pageName, fieldName] = selector.split(".");
            // First try globalThis.loc if available
            const globalLoc = globalThis.loc;
            if ((_b = (_a = globalLoc === null || globalLoc === void 0 ? void 0 : globalLoc[fileName]) === null || _a === void 0 ? void 0 : _a[pageName]) === null || _b === void 0 ? void 0 : _b[fieldName]) {
                // console.log(`✅ Found locator in globalThis.loc for loc.ts.${fileName}.${pageName}.${fieldName}`);
                return globalLoc[fileName][pageName][fieldName](page);
            }
        }
        if (selector.startsWith("loc.")) {
            const [, fileName, pageName, fieldName] = selector.split(".");
            // First try globalThis.loc if available
            const globalLoc = globalThis.loc;
            if ((_d = (_c = globalLoc === null || globalLoc === void 0 ? void 0 : globalLoc[fileName]) === null || _c === void 0 ? void 0 : _c[pageName]) === null || _d === void 0 ? void 0 : _d[fieldName]) {
                // console.log(`✅ Found locator in globalThis.loc for loc.ts.${fileName}.${pageName}.${fieldName}`);
                return globalLoc[fileName][pageName][fieldName](page);
            }
        }
        throw new Error(`❌ Unknown locator source type "${locType}". Use loc. or locator.`);
    }
    if (overridePattern && overridePattern.toLowerCase() === '-no-check-') {
        console.log("📍 '-no-check-' detected. Skipping locator resolution.");
        return undefined; // or even better, throw a custom signal or null to trigger fallback
    }
    //SmartAI
    const isSmartAiEnabled = String(_playq_1.vars.getConfigValue('smartAi.enable')).toLowerCase().trim() === 'true';
    if (isSmartAiEnabled) {
        const smartAiEngine = _playq_1.engines.smartAi;
        return await smartAiEngine(page, type, selector, smartAiRefresh);
    }
    // Fallback to locatorPattern (locPattern)
    const isPatternEnabled = String(_playq_1.vars.getConfigValue('patternIq.enable')).toLowerCase().trim() === 'true';
    console.log('PatternIQ enabled?', isPatternEnabled);
    if (isPatternEnabled) {
        const patternEngine = _playq_1.engines.patternIq;
        return await patternEngine(page, type, selector, overridePattern, timeout);
        // return isPatternEnabled
        //   ? await patternEngine(page,type, selector, overridePattern, timeout)
        //   : webFixture.getCurrentPage().locator(selector);
    }
    // Fallback to default locator
    return page.locator(selector);
}
//# sourceMappingURL=webLocFixture.js.map