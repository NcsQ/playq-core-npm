"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const _playq_1 = require("@playq");
(0, cucumber_1.Given)("Comm: Wait-In-Milli-Seconds -seconds: {param}", async function (seconds) {
    await _playq_1.comm.waitInMilliSeconds(parseInt(seconds));
});
(0, cucumber_1.Given)("Comm: Comment -text: {param}", async function (comment) {
    await _playq_1.comm.comment(comment);
});
(0, cucumber_1.Given)("Comm: Encrypt-Password -text: {param} -options: {param}", async function (encryptedText, options) {
    await _playq_1.comm.encryptPassword(encryptedText, options);
});
(0, cucumber_1.Given)("Comm: Encrypt-Text -text: {param} -options: {param}", async function (encryptedText, options) {
    await _playq_1.comm.encryptText(encryptedText, options);
});
(0, cucumber_1.Given)("Comm: Encrypt-Password -text: {param} and store in -variable: {param} -options: {param}", async function (textToEncrypt, varToStore, options) {
    await _playq_1.comm.encryptPasswordAndStore(textToEncrypt, varToStore, options);
});
(0, cucumber_1.Given)("Comm: Encrypt -text: {param} and store in -variable: {param} -options: {param}", async function (textToEncrypt, varToStore, options) {
    console.log('Text to encrypt:', textToEncrypt);
    await _playq_1.comm.encryptTextAndStore(textToEncrypt, varToStore, options);
});
(0, cucumber_1.Given)("Comm: Decrypt -text: {param} and store in -variable: {param} -options: {param}", async function (encryptedText, varName, options) {
    await _playq_1.comm.decrypt(encryptedText, varName, options);
});
(0, cucumber_1.Given)("Comm: Get-Random-From-List -arrayList: {param}", async function (list) {
    const arrayList = JSON.parse(list);
    await _playq_1.comm.getRandomFromList(arrayList);
});
(0, cucumber_1.Given)("Comm: Remove-Leading-Zero-From-Date -text: {param}", async function (dateText) {
    await _playq_1.comm.removeLeadingZeroFromMonthAndDate(dateText);
});
(0, cucumber_1.Given)("Comm: Write-JSON-To-File -filePath: {param} -data: {param} -options: {param}", async function (filePath, data, options) {
    await _playq_1.comm.writeJsonToFile(filePath, data, options);
});
(0, cucumber_1.Given)("Comm: Attach-Log -message: {param} -mimeType: {param} -msgType: {param}", async function (message, mimeType, msgType) {
    await _playq_1.comm.attachLog(message, mimeType, msgType);
});
(0, cucumber_1.Given)("Store -value: {param} in -variable: {param} -options: {param}", async function (value, varName, options) {
    await _playq_1.comm.storeValue(value, varName, options);
});
//# sourceMappingURL=commStepDefs.js.map