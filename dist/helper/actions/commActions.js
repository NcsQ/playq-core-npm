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
exports.waitInMilliSeconds = waitInMilliSeconds;
exports.comment = comment;
exports.encryptPassword = encryptPassword;
exports.encryptText = encryptText;
exports.encryptPasswordAndStore = encryptPasswordAndStore;
exports.encryptTextAndStore = encryptTextAndStore;
exports.decrypt = decrypt;
exports.getRandomFromList = getRandomFromList;
exports.removeLeadingZeroFromMonthAndDate = removeLeadingZeroFromMonthAndDate;
exports.writeJsonToFile = writeJsonToFile;
exports.toDollarAmount = toDollarAmount;
exports.attachLog = attachLog;
exports.storeValue = storeValue;
exports.generateTotpTokenToVariable = generateTotpTokenToVariable;
const vars = __importStar(require("../bundle/vars"));
const webFixture_1 = require("../fixtures/webFixture");
const logFixture_1 = require("../fixtures/logFixture");
const crypto = __importStar(require("../util/utilities/cryptoUtil"));
const runnerType_1 = require("../util/runnerType");
const test_1 = require("@playwright/test");
const allure = __importStar(require("allure-js-commons"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vars_1 = require("../bundle/vars");
const totpHelper_1 = require("../util/totp/totpHelper");
/**
 * Comm: Wait-In-Milli-Seconds -seconds: {param}
 *
 * Pauses execution for a given number of milliseconds.
 * Logs a message using the test logger if available.
 *
 * @param ms - The number of milliseconds to wait.
 *
 * @example
 * Comm: Wait-In-Milli-Seconds -seconds: "1000"
 */
async function waitInMilliSeconds(ms) {
    var _a, _b;
    const logger = (_a = logFixture_1.logFixture.getLogger) === null || _a === void 0 ? void 0 : _a.call(logFixture_1.logFixture);
    (_b = logger === null || logger === void 0 ? void 0 : logger.info) === null || _b === void 0 ? void 0 : _b.call(logger, `⏳ Waiting for ${ms} ms`);
    await new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Comm: Comment -text: {param}
 *
 * Logs a comment with variable substitution to the console.
 * Useful for adding contextual information to the test log.
 *
 * Variables inside the message string (e.g., ${var.username}) will be replaced using `vars.replaceVariables`.
 *
 * @param message - The comment or message to log.
 *
 * @example
 * Comm: Comment -text: "LAMBDA TEST COMPLETE"
 */
async function comment(message) {
    let formattedMessage = vars.replaceVariables(message);
    console.log(`💬 Comment: ${formattedMessage}`);
}
/**
 * Comm: Encrypt-Password -text: {param} -options: {param}
 *
 * Encrypts the given text as a password and returns it with a "pwd." prefix.
 *
 * @param encryptText - The text to encrypt.
 * @param options - Optional string or object of additional options (parsed if string).
 * @returns A string prefixed with "pwd." followed by the encrypted value.
 *
 */
async function encryptPassword(encryptText, options) {
    const options_json = typeof options === 'string' ? (0, vars_1.parseLooseJson)(options) : (options || {});
    let encryptedText = crypto.encrypt(encryptText);
    console.log('🔐 Encrypted Password:', 'pwd.' + encryptedText);
    return 'pwd.' + encryptedText;
}
/**
 * Comm: Encrypt-Text -text: {param} -options: {param}
 *
 * Encrypts the given text and returns it with an "enc." prefix.
 *
 * @param encryptText - The text to encrypt.
 * @param options - Optional string or object of additional options (parsed if string).
 * @returns A string prefixed with "enc." followed by the encrypted value.
 *
 */
async function encryptText(encryptText, options) {
    const options_json = typeof options === 'string' ? (0, vars_1.parseLooseJson)(options) : (options || {});
    let encryptedText = crypto.encrypt(encryptText);
    console.log('🔐 Encrypted Text:', 'enc.' + encryptedText);
    return 'enc.' + encryptedText;
}
/**
 * Comm: Encrypt-Password -text: {param} and store in -variable: {param} -options: {param}
 *
 * Encrypts the given password, prefixes it with "pwd.", and stores it in a variable.
 *
 * @param encryptText - The plain text password to encrypt.
 * @param varNameToStore - The name of the variable to store the encrypted password.
 * @param options - Optional string or object of additional options (parsed if string).
 *
 */
async function encryptPasswordAndStore(encryptText, varNameToStore, options) {
    const options_json = typeof options === 'string' ? (0, vars_1.parseLooseJson)(options) : (options || {});
    let encryptedText = crypto.encrypt(encryptText);
    console.log('🔐 Encrypted Text:', 'pwd.' + encryptedText);
    vars.setValue(varNameToStore, 'pwd.' + encryptedText);
}
/**
 * Comm: Encrypt -text: {param} and store in -variable: {param} -options: {param}
 *
 * Encrypts the given text, prefixes it with "enc.", and stores it in a variable.
 *
 * @param encryptText - The text to encrypt.
 * @param varNameToStore - The variable name to store the encrypted text.
 * @param options - Optional string or object of additional options (parsed if string).
 *
 */
async function encryptTextAndStore(encryptText, varNameToStore, options) {
    const options_json = typeof options === 'string' ? (0, vars_1.parseLooseJson)(options) : (options || {});
    let encryptedText = crypto.encrypt(encryptText);
    console.log('🔐 Encrypted Text:', 'enc.' + encryptedText);
    vars.setValue(varNameToStore, 'enc.' + encryptedText);
}
/**
 * Comm: Decrypt -text: {param} and store in -variable: {param} -options: {param}
 *
 * Decrypts the given encrypted text and stores the result in a variable.
 *
 * @param encryptedText - The encrypted value to decrypt.
 * @param varName - The variable name to store the decrypted result.
 * @param options - Optional string or object of additional options (parsed if string).
 *
 */
async function decrypt(encryptedText, varName, options) {
    const options_json = typeof options === 'string' ? (0, vars_1.parseLooseJson)(options) : (options || {});
    let decryptedText = crypto.decrypt(encryptedText);
    vars.setValue(varName, decryptedText);
}
/**
 * Comm: Get-Random-From-List -arrayList: {param}
 *
 * Selects and returns a random item from a given non-empty array.
 *
 * @template T
 * @param list - The array to select a random item from.
 * @returns A randomly selected item from the array.
 *
 * @throws Error if the list is not a non-empty array.
 *
 */
async function getRandomFromList(list) {
    if (!Array.isArray(list) || list.length === 0) {
        throw new Error("⚠️ getRandomFromList: list must be a non-empty array.");
    }
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}
/**
 * Comm: Remove-Leading-Zero-From-Date -text: {param}
 *
 * Removes leading zeros from both the day and month in a date string of format DD/MM/YYYY.
 * Example: '03/07/2025' => '3/7/2025'
 * @param dateStr - The date string in DD/MM/YYYY format
 * @returns The date string with leading zeros removed from day and month
 */
async function removeLeadingZeroFromMonthAndDate(dateStr) {
    return dateStr.replace(/\b0(\d)/g, "$1");
}
/**
 * Comm: Write-JSON-To-File -filePath: {param} -data: {param} -options: {param}
 *
 * Writes JSON data to a file with options to override, append, or wrap in array.
 *
 * @param filePath - The destination file path.
 * @param data - The JSON data to write (object or array).
 * @param options - { override, append, toArray }
 */
async function writeJsonToFile(filePath, data, options = { override: true, append: false, toArray: false }) {
    const defaultOptions = { override: true, append: false, toArray: false };
    const opts = { ...defaultOptions, ...options };
    const absPath = path.resolve(filePath);
    if (opts.append) {
        // Only works if file contains an array
        let arr = [];
        if (fs.existsSync(absPath)) {
            const fileContent = fs.readFileSync(absPath, 'utf-8');
            try {
                arr = JSON.parse(fileContent);
                if (!Array.isArray(arr))
                    throw new Error('File does not contain a JSON array.');
            }
            catch {
                throw new Error('File is not a valid JSON array.');
            }
        }
        arr.push(data);
        fs.writeFileSync(absPath, JSON.stringify(arr, null, 2), 'utf-8');
    }
    else if (opts.override) {
        // Overwrite or create new file
        let out = data;
        if (opts.toArray) {
            out = Array.isArray(data) ? data : [data];
        }
        fs.writeFileSync(absPath, JSON.stringify(out, null, 2), 'utf-8');
    }
    else {
        throw new Error('Either override or append must be true.');
    }
}
/**
 * Ensures the value is formatted as a currency string: $<amount>.00
 * @param value - The input value (number or string)
 * @returns {string} - Formatted as $<amount>.00
 */
function toDollarAmount(value) {
    // Remove any non-numeric except dot
    let num = typeof value === 'number'
        ? value
        : parseFloat(String(value).replace(/[^0-9.]/g, ''));
    if (isNaN(num))
        num = 0;
    return `$${num.toFixed(2)}`;
}
/**
 * Comm: Attach-Log -message: {param} -mimeType: {param} -msgType: {param}
 *
 * Attach log or message to the test context (Cucumber or Playwright runner).
 * @param message The message or buffer to attach
 * @param mimeType The mime type (default: text/plain)
 */
async function attachLog(message, mimeType, msgType) {
    if (!mimeType)
        mimeType = "text/plain";
    if (!msgType)
        msgType = "";
    if ((0, runnerType_1.isCucumberRunner)()) {
        const world = webFixture_1.webFixture.getWorld();
        if (world === null || world === void 0 ? void 0 : world.attach) {
            await world.attach(message, mimeType);
        }
        else {
            console.warn("⚠️ No World.attach() available in Cucumber context");
        }
    }
    else if ((0, runnerType_1.isPlaywrightRunner)()) {
        await test_1.test
            .info()
            .attach(msgType || "Log", { body: message, contentType: mimeType });
    }
    else {
        console.warn("⚠️ attachLog: Unknown runner type");
    }
}
/**
 * Comm: Store -value: {param} in -variable: {param} -options: {param}
 *
 * Stores a value (with optional variable substitution) into a runtime variable.
 *
 * Variables inside the value string (e.g., ${var.username}) will be resolved using `vars.replaceVariables`.
 *
 * @param value - The value to store (can include variable references).
 * @param varName - The name of the variable to store the resolved value into.
 * @param options - Optional string or object with additional parameters (parsed if string). Currently unused but reserved for future logic.
 *
 * @example
 * Store -value: "${faker.string.alphanumeric({length:4})}" in -variable: "var.centre.code" -options: ""
 */
async function storeValue(value, varName, options) {
    const options_json = typeof options === 'string' ? (0, vars_1.parseLooseJson)(options) : (options || {});
    const resolvedValue = vars.replaceVariables(value);
    vars.setValue(varName, resolvedValue);
}
/**
 * Comm: Generate TOTP Token to variable -varName: {param} -options: {param}
 *
 * Generates a TOTP (Time-based One-Time Password) token using the provided secret and stores it in a variable.
 *
 * @param varName - The name of the variable to store the generated TOTP token.
 * @param options - Optional string or object containing:
 *   - secret: [string] The TOTP secret key (default: process.env.PLAYQ_TOTP_SECRET_KEY).
 *
 * @example
 * Comm: Generate TOTP Token to variable -varName: "var.otp" -options: '{"secret":"MYSECRET"}'
 */
async function generateTotpTokenToVariable(varName, options) {
    const options_json = typeof options === "string" ? vars.parseLooseJson(options) : options || {};
    const { secret, step = 30, digits = 6, algorithm = "SHA-1" } = options_json;
    if ((0, runnerType_1.isPlaywrightRunner)()) {
        await allure.step(`Comm: Generate TOTP Token to variable -varName: ${varName} -options: ${JSON.stringify(options_json)}`, async () => {
            await doGenerateTotpTokenToVariable();
        });
    }
    else {
        await doGenerateTotpTokenToVariable();
    }
    async function doGenerateTotpTokenToVariable() {
        let secretKey = process.env.PLAYQ_TOTP_SECRET_KEY || secret;
        if (!secretKey) {
            throw new Error('❌ PLAYQ_TOTP_SECRET_KEY not found in environment variables or in options');
        }
        if (secretKey.startsWith("enc.")) {
            secretKey = vars.replaceVariables(`#{${secretKey}}`);
        }
        const totpHelper = new totpHelper_1.TOTPHelper(secretKey);
        // Generate and return token
        const token = totpHelper.generateToken();
        vars.setValue(varName, token);
    }
}
//# sourceMappingURL=commActions.js.map