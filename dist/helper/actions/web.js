"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = require("@src/global");
const runner_1 = require("@config/runner");
// // Given("Web: I open web browser with {param}", async function (url) {
// //   await web.goto(url);
// // });
// // // Given("Web: Open browser with url {param} -options: {param}", Web_OpenBrowser);
// // // export async function Web_OpenBrowser(url: string, options: string) {
// // //   const options_json = parseLooseJson(options);
// // //   await web.goto(url);
// // // }
// // Given("Web: Fill input field {param} with value {param} options: {param}", async function (input,value,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.type(input,value,options_json)
// // });
// // // CLICK STEPS
// // Given("Web: Click button {param} options: {param}", async function (button,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.clickButton(button,options_json)
// // });
// // Given("Web: Click link {param} options: {param}", async function (link,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.clickLink(link,options_json)
// // });
// // Given("Web: Click radio button {param} options: {param}", async function (radio,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.clickRadioButton(radio,options_json)
// // });
// // Given("Web: Click checkbox {param} options: {param}", async function (checkbox,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.clickCheckbox(checkbox,options_json)
// // });
// // // VERIFY STEPS
// // Given("Web: Verify header text is {param} options: {param}", async function (header,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.verifyHeaderText(header,options_json)
// // });
// // Given("Web: Verify tab selected {param} options: {param}", async function (tab,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.verifyTabSelected(tab,options_json)
// // });
// // Given("Web: Verify page title is {param} options: {param}", async function (title,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.verifyPageTitle(title,options_json)
// // });
// // // WAIT STEPS
// // Given("Web: Wait in milliseconds {param}", async function (wait_time) {
// //   await web.waitInMilliSeconds(parseInt(wait_time));
// // });
// // Given("Web: Mouseover on link {param} options: {param}", async function (link,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.mouseoverOnLink(link,options_json)
// // });
// // Given("Web: Mouseover on button {param} options: {param}", async function (button,options) {
// //   const options_json = parseLooseJson(options);
// //   await web.mouseoverOnButton(button,options_json)
// // });
class WebActions {
    // private async throwErrorAndAttach(message: string) {
    //   console.error(`${message}`);
    //   await this.attachFn(`- ${message}`, "text/plain");
    //   throw new Error(`${message}`);
    // }
    async throwErrorAndAttach(message) {
        console.error(`${message}`);
        if (runner_1.isCucumberRunner && this.attachFn) {
            await this.attachFn(`- ${message}`, "text/plain");
        }
        else if (runner_1.isPlaywrightRunner) {
            console.warn(`⚠️ Playwright Runner: attachment skipped for message: ${message}`);
        }
        else {
            console.warn(`⚠️ attachFn not available. Skipping attachment: ${message}`);
        }
        throw new Error(`${message}`);
    }
    async throwWarningAndAttach(message) {
        console.warn(`${message}`);
        await this.attachFn(`<div style="color:orange;font-weight:bold;">⚠️ Soft-Fail: ${message}</div>`, "text/html");
        // await this.attachFn(`- ${message}`, "text/plain");
    }
    async throwInfoAndAttach(message) {
        console.info(`${message}`);
        await this.attachFn(`- ${message}`, "text/plain");
    }
    setAttachFn(fn) {
        this.attachFn = fn;
    }
    async captureAndAttachScreenshot(message) {
        const page = global_1.webFixture.getCurrentPage();
        if (page) {
            const screenshot = await page.screenshot();
            await this.attachFn(screenshot, "image/png");
            await this.attachFn(`Screenshot Text: ${message}`, "text/plain");
        }
    }
    async parseOptions(optionStr) {
        try {
            const normalized = optionStr.replace(/'/g, '"');
            return JSON.parse(normalized);
        }
        catch (err) {
            console.error("❌ Failed to parse options string:", err);
            return {};
        }
    }
}
// export function parseLooseJson(str: string): Record<string, any> {
//   if (!str || str.trim() === "" || str.trim() === '""') {
//     return {}; // Return an empty object if the input is empty or just empty quotes
//   }
//    // Wrap in {} if not already present
//    const needsBraces = !str.trim().startsWith("{") || !str.trim().endsWith("}");
//    const wrappedStr = needsBraces ? `{${str}}` : str;
//   try {
//     const normalized = wrappedStr
//       .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // unquoted keys to quoted
//       .replace(/'/g, '"'); // single to double quotes
//     return JSON.parse(normalized);
//   } catch (err) {
//     throw new Error(`❌ Failed to parse options string: "${str}". Error: ${err.message}`);
//   }
// }
const web = new WebActions();
exports.default = web;
//# sourceMappingURL=web.js.map