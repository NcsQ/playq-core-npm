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
const webFixture_1 = require("../fixtures/webFixture");
const cucumber_1 = require("@cucumber/cucumber");
const webActions = __importStar(require("./webActions"));
/**
 * Web: Click Button -field: {param} -options: TESTIGN COMMENTS
 */
(0, cucumber_1.Given)("Web: Open browser -url: {param} -options: {param}", async function (url, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.openBrowser(page, url, options);
});
(0, cucumber_1.Given)("Web: Navigate by path -relativePath: {param} -options: {param}", async function (relativePath, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.navigateByPath(page, relativePath, options);
});
(0, cucumber_1.Given)("Web: Click button -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.clickButton(page, field, options);
});
(0, cucumber_1.Given)("Web: Click link -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.clickLink(page, field, options);
});
(0, cucumber_1.Given)("Web: Click radio button -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.clickRadioButton(page, field, options);
});
(0, cucumber_1.Given)("Web: Click checkbox -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.clickCheckbox(page, field, options);
});
(0, cucumber_1.Given)("Web: Mouseover on link -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.mouseoverOnLink(page, field, options);
});
(0, cucumber_1.Given)("Web: Fill input -field: {param} -value: {param} -options: {param}", async function (field, value, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.input(page, field, value, options);
});
(0, cucumber_1.Given)("Web: Fill -field: {param} -value: {param} -options: {param}", async function (field, value, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.fill(page, field, value, options);
});
(0, cucumber_1.Given)("Web: Verify header -text: {param} -options: {param}", async function (text, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyHeaderText(page, text, options);
});
(0, cucumber_1.Given)("Web: Verify page title -text: {param} -options: {param}", async function (text, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyPageTitle(page, text, options);
});
(0, cucumber_1.Given)("Web: Wait for Input -field: {param} -state: {param} (enabled or disabled) -options: {param}", async function (field, state, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.waitForInputState(page, field, state, options);
});
(0, cucumber_1.Given)("Web: Wait for Text at Location -field: {param} -text: {param} -options: {param}", async function (field, expectedText, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.waitForTextAtLocation(page, field, expectedText, options);
});
(0, cucumber_1.Given)("Web: Click tab -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.clickTab(page, field, options);
});
(0, cucumber_1.Given)("Web: Select Dropdown -field: {param} -value: {param} -options: {param}", async function (field, value, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.selectDropdown(page, field, value, options);
});
(0, cucumber_1.Given)("Web: Verify text on page -text: {param} -options: {param}", async function (text, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyTextOnPage(page, text, options);
});
(0, cucumber_1.Given)("Web: Verify text at location -field: {param} -value: {param} -options: {param}", async function (field, expectedText, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyTextAtLocation(page, field, expectedText, options);
});
(0, cucumber_1.Given)("Web: Verify input field is present -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyInputFieldPresent(page, field, options);
});
(0, cucumber_1.Given)("Web: Verify input field value -field: {param} -value: {param} -options: {param}", async function (field, expectedValue, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyInputFieldValue(page, field, expectedValue, options);
});
(0, cucumber_1.Given)("Web: Verify Tab field Present -field: {param} -options: {param}", async function (field, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyTabField(page, field, options);
});
(0, cucumber_1.Given)("Web: Verify toast text contains -text: {param} -options: {param}", async function (text, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.verifyToastTextContains(page, text, options);
});
(0, cucumber_1.Given)("Web: Wait for URL -url: {param} -options: {param}", async function (url, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.waitForUrl(page, url, options);
});
(0, cucumber_1.Given)("Web: Press Key -key: {param} -options: {param}", async function (key, options) {
    let page = webFixture_1.webFixture.getCurrentPage();
    await webActions.pressKey(page, key, options);
});
//# sourceMappingURL=webStepDefs.js.map