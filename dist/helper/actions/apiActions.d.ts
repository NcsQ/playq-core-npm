/**
 * @file apiActions.ts
 *
 * Provides a unified API for api actions in Playwright and Cucumber frameworks.
 * Supports navigation, interaction, and verification across both runners.
 *
 * Key Features:
 * - Supports hybrid context: Playwright Runner (`page`) and Cucumber World (`webFixture`).
 * - Rich options for screenshots, timeouts, locators, and assertions.
 * - Enterprise-ready design with robust error handling, logging, and extensibility.
 *
 * Authors: Renish Kozhithottathil [Lead Automation Principal, NCS]
 * Date: 2025-07-01
 * Version: v1.0.0
 *
 * Note: This file adheres to the PlayQ Enterprise Automation Standards.
 */
/**
 * Calls a predefined API action using configuration from a resource file, supporting dynamic variable replacement,
 * custom headers, body, parameters, authentication, and assertion of expected status codes.
 *
 * This function is designed for hybrid Playwright/Cucumber test frameworks, enabling enterprise-grade API testing
 * with robust error handling and flexible options.
 *
 * @param action - The API action name (corresponds to a file in `resources/api/{action}.api.ts`).
 * @param config - The configuration key within the API module (e.g., "success", "errorCase").
 * @param baseUrl - The base URL for the API endpoint.
 * @param options - Optional. Additional options as a JSON string or object. Supports:
 *   - `maxUrlRedirects`: Maximum number of redirects (default: from config or 5).
 *   - `maxTimeout`: Request timeout in milliseconds (default: from config or 10000).
 *   - `auth`: Axios authentication object.
 *   - Any other Axios request config options.
 *
 * @throws Error if the API config is not found or if the response status does not match `expectedStatus` in config.
 *
 * @example
 * // Example API config file: resources/api/user.api.ts
 * export const api = {
 *   getUser: {
 *     path: "/users/{userId}",
 *     method: "GET",
 *     headers: { "Authorization": "Bearer ${token}" },
 *     expectedStatus: "200"
 *   }
 * };
 *
 * // Usage in test:
 * await callApi(
 *   "user",
 *   "getUser",
 *   "https://api.example.com",
 *   { userId: "123", token: "abc123" }
 * );
 *
 * @example
 * // With options as a JSON string:
 * await callApi(
 *   "user",
 *   "getUser",
 *   "https://api.example.com",
 *   '{"userId":"123","token":"abc123","maxTimeout":5000}'
 * );
 *
 * @example
 * // With custom authentication:
 * await callApi(
 *   "user",
 *   "getUser",
 *   "https://api.example.com",
 *   { auth: { username: "admin", password: "secret" } }
 * );
 */
export declare function callApi(action: string, config: string, baseUrl: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Get the value at a given JSON path from the last API response body.
 * Example: path = "data[0].id" will return the id of the first item in data array.
 * Supports paths like "x.data[0].id" (where "x" is treated as the root).

 */
export declare function getLastResponseJsonPathValue(path: string): Promise<any>;
/**
 * Assign multiple values from the last API response body, header, status, or status text to variables.
 * @param pathVarString Comma-separated JSON paths (e.g. "x.data[1].email,h.content-type,s.,t.")
 * @param varKeyString  Comma-separated variable keys (e.g. "var.email,var.contentType,var.status,var.statusText")
 * Prefixes (case-insensitive):
 *   x. / (body). = response body (default if no prefix)
 *   h. / (header). = response header
 *   s / (status) / (statusCode) = response status code
 *   t / (statusText) = response status text
 * Examples:
 *   "x.data[0].id" or "(body).data[0].id" → from body
 *   "h.content-type" or "(header).content-type" → from header
 *   "s" or "(status)" or "(statusCode)" → response status code
 *   "t" or "(statusText)" → response status text
 *   "data[0].id" → from body (default)
 */
export declare function storeLastResponseJsonPathsToVariables(pathVarString: string, varKeyString: string): Promise<void>;
/**
 * Verifies that a given value matches the expected value.
 * Throws an error if the values do not match.
 *
 * @param actual - The actual value to verify.
 * @param expected - The expected value to compare against.
 * @param message - Optional. Custom error message on failure.
 */
export declare function verifyValue(actual: any, expected: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Verifies that a value at a given JSON path in the last API response matches the expected value.
 * Throws an error if the values do not match.
 *
 * @param path - The JSON path to extract from the last response body/header/status.
 * @param expected - The expected value to compare against.
 * @param options - Optional. Supports { assert: boolean, partial_text: boolean }
 */
export declare function verifyPathValue(path: string, expected: string, options?: string | Record<string, any>): Promise<void>;
//# sourceMappingURL=apiActions.d.ts.map