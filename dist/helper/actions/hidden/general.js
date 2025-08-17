"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.Given)("Step Group: {param} {param}", async function (stepGroupName, stepGroupDesc) {
    console.error(`❌ Step Group not available: ${stepGroupName} | ${stepGroupDesc}`);
});
(0, cucumber_1.Given)("- Step Group - START: {param} Desc: {param}", async function (stepGroupName, stepGroupDesc) {
    console.log(`-> Step Group [START]: ${stepGroupName} | ${stepGroupDesc}`);
});
(0, cucumber_1.Given)("- Step Group - END: {string}", async function (stepGroupName) {
    console.log(`-> Step Group [END]: ${stepGroupName}`);
});
(0, cucumber_1.Given)("Step Group: tests", async function (stepGroupName, stepGroupDesc) {
    console.error(`❌ Step Group not available: ${stepGroupName} | ${stepGroupDesc}`);
});
//# sourceMappingURL=general.js.map