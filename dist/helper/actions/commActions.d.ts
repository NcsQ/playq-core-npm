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
export declare function waitInMilliSeconds(ms: number): Promise<void>;
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
export declare function comment(message: string): Promise<void>;
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
export declare function encryptPassword(encryptText: string, options?: string | Record<string, any>): Promise<string>;
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
export declare function encryptText(encryptText: string, options?: string | Record<string, any>): Promise<string>;
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
export declare function encryptPasswordAndStore(encryptText: string, varNameToStore: string, options?: string | Record<string, any>): Promise<void>;
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
export declare function encryptTextAndStore(encryptText: string, varNameToStore: string, options?: string | Record<string, any>): Promise<void>;
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
export declare function decrypt(encryptedText: string, varName: string, options?: string | Record<string, any>): Promise<void>;
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
export declare function getRandomFromList<T>(list: T[]): Promise<T>;
/**
 * Comm: Remove-Leading-Zero-From-Date -text: {param}
 *
 * Removes leading zeros from both the day and month in a date string of format DD/MM/YYYY.
 * Example: '03/07/2025' => '3/7/2025'
 * @param dateStr - The date string in DD/MM/YYYY format
 * @returns The date string with leading zeros removed from day and month
 */
export declare function removeLeadingZeroFromMonthAndDate(dateStr: string): Promise<string>;
interface WriteJsonOptions {
    override?: boolean;
    append?: boolean;
    toArray?: boolean;
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
export declare function writeJsonToFile(filePath: string, data: any, options?: WriteJsonOptions): Promise<void>;
/**
 * Ensures the value is formatted as a currency string: $<amount>.00
 * @param value - The input value (number or string)
 * @returns {string} - Formatted as $<amount>.00
 */
export declare function toDollarAmount(value: string | number): string;
/**
 * Comm: Attach-Log -message: {param} -mimeType: {param} -msgType: {param}
 *
 * Attach log or message to the test context (Cucumber or Playwright runner).
 * @param message The message or buffer to attach
 * @param mimeType The mime type (default: text/plain)
 */
export declare function attachLog(message: string | Buffer, mimeType?: string, msgType?: string): Promise<void>;
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
export declare function storeValue(value: string, varName: string, options?: string | Record<string, any>): Promise<void>;
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
export declare function generateTotpTokenToVariable(varName: string, options?: string | Record<string, any>): Promise<void>;
export {};
//# sourceMappingURL=commActions.d.ts.map