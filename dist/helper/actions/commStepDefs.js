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
const cucumber_1 = require("@cucumber/cucumber");
const comm = __importStar(require("./commActions"));
(0, cucumber_1.Given)("Comm: Wait-In-Milli-Seconds -seconds: {param}", async function (seconds) {
    await comm.waitInMilliSeconds(parseInt(seconds));
});
(0, cucumber_1.Given)("Comm: Comment -text: {param}", async function (comment) {
    await comm.comment(comment);
});
(0, cucumber_1.Given)("Comm: Encrypt-Password -text: {param} -options: {param}", async function (encryptedText, options) {
    await comm.encryptPassword(encryptedText, options);
});
(0, cucumber_1.Given)("Comm: Encrypt-Text -text: {param} -options: {param}", async function (encryptedText, options) {
    await comm.encryptText(encryptedText, options);
});
(0, cucumber_1.Given)("Comm: Encrypt-Password -text: {param} and store in -variable: {param} -options: {param}", async function (textToEncrypt, varToStore, options) {
    await comm.encryptPasswordAndStore(textToEncrypt, varToStore, options);
});
(0, cucumber_1.Given)("Comm: Encrypt -text: {param} and store in -variable: {param} -options: {param}", async function (textToEncrypt, varToStore, options) {
    console.log('Text to encrypt:', textToEncrypt);
    await comm.encryptTextAndStore(textToEncrypt, varToStore, options);
});
(0, cucumber_1.Given)("Comm: Decrypt -text: {param} and store in -variable: {param} -options: {param}", async function (encryptedText, varName, options) {
    await comm.decrypt(encryptedText, varName, options);
});
(0, cucumber_1.Given)("Comm: Get-Random-From-List -arrayList: {param}", async function (list) {
    const arrayList = JSON.parse(list);
    await comm.getRandomFromList(arrayList);
});
(0, cucumber_1.Given)("Comm: Remove-Leading-Zero-From-Date -text: {param}", async function (dateText) {
    await comm.removeLeadingZeroFromMonthAndDate(dateText);
});
(0, cucumber_1.Given)("Comm: Write-JSON-To-File -filePath: {param} -data: {param} -options: {param}", async function (filePath, data, options) {
    await comm.writeJsonToFile(filePath, data, options);
});
(0, cucumber_1.Given)("Comm: Attach-Log -message: {param} -mimeType: {param} -msgType: {param}", async function (message, mimeType, msgType) {
    await comm.attachLog(message, mimeType, msgType);
});
(0, cucumber_1.Given)("Store -value: {param} in -variable: {param} -options: {param}", async function (value, varName, options) {
    await comm.storeValue(value, varName, options);
});
//# sourceMappingURL=commStepDefs.js.map