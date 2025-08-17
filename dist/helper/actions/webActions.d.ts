/**
 * @file webActions.ts
 *
 * Provides a unified API for web actions in Playwright and Cucumber frameworks.
 * Supports navigation, interaction, and verification across both runners.
 *
 * Key Features:
 * - Supports hybrid context: Playwright Runner (`page`) and Cucumber World (`webFixture`).
 * - Rich options for screenshots, timeouts, locators, and assertions.
 * - Enterprise-ready design with robust error handling, logging, and extensibility.
 *
 * Authors: Renish Kozhithottathil [Lead Automation Principal, NCS]
 * Date: 2025-05-20
 * Version: v1.0.0
 *
 * Note: This file adheres to the PlayQ Enterprise Automation Standards.
 */
import { Page, Locator } from "@playwright/test";
/**
 * Web: Wait for Text at Location -field: {param} -text: {param} -options: {param}
 *
 * Waits until the specified text appears at the given field/locator.
 *
 * @param page - Playwright Page instance
 * @param field - The selector or Locator where the text should appear
 * @param expectedText - The text to wait for
 * @param options - Optional string or object:
 *   - actionTimeout: [number] Timeout in ms (default: 30000)
 *   - partialMatch: [boolean] If true, waits for substring match (default: false)
 *   - caseSensitive: [boolean] If true, match is case-sensitive (default: true)
 *   - screenshot: [boolean] Capture screenshot after waiting (default: false)
 *   - screenshotText: [string] Description for screenshot
 *   - screenshotFullPage: [boolean] Full page screenshot (default: true)
 *
 * @example
 *   await waitForTextAtLocation(page, 'h1', 'Welcome', { actionTimeout: 10000, partialMatch: true });
 */
export declare function waitForTextAtLocation(page: Page, field: string | Locator, expectedText: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Wait for Header -header: {param} -text: {param} -options: {param}
 *
 * Waits until a specific header element contains the expected text.
 * The header parameter should be a locator or will use pattern resolution.
 *
 * @param page - Playwright Page instance
 * @param header - The locator of the header element (e.g., "h1", "xpath=//h1[@class='title']", or Locator object)
 * @param headerText - The expected header text to wait for (e.g., "Welcome", "Dashboard")
 * @param options - Optional string or object:
 *   - actionTimeout: [number] Timeout in ms (default: 30000)
 *   - partialMatch: [boolean] If true, waits for substring match (default: false)
 *   - ignoreCase: [boolean] If true, case-insensitive match (default: true)
 *   - pattern: [string] Optional pattern to refine element search
 *   - screenshot: [boolean] Capture screenshot after waiting (default: false)
 *   - screenshotText: [string] Description for screenshot
 *   - screenshotFullPage: [boolean] Full page screenshot (default: true)
 *
 * @example
 *   await waitForHeader(page, 'h1', 'Welcome Back!', {
 *     partialMatch: true,
 *     screenshot: true
 *   });
 */
export declare function waitForHeader(page: Page, header: string | Locator, headerText: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Attach log or message to the test context (Cucumber or Playwright runner).
 * @param message The message or buffer to attach
 * @param mimeType The mime type (default: text/plain)
 */
export declare function attachLog(message: string | Buffer, mimeType?: string): Promise<void>;
/**
 * [ACTION] Open a browser page (Playwright/Cucumber hybrid support).
 *
 * Opens the given URL in a new browser page or reuses the existing page based on the runner context.
 * Supports automatic screenshot and log attachments.
 *
 * @param pageOverride - Optional Playwright Page object (used in Playwright tests). Not required in Cucumber.
 * @param url - The URL to open (e.g., "https://example.com").
 * @param options - JSON string or object for additional behaviors:
 *   - screenshot [boolean]: Capture screenshot after navigation. Default: false.
 *   - screenshotText [string]: Description for screenshot attachment. Default: "".
 *   - screenshotFullPage [boolean]: Full page screenshot or viewport only. Default: true.
 *
 * @returns void
 *
 * @example
 * // Playwright Test
 * test('Open Google', async ({ page }) => {
 *   await openBrowser('https://google.com', '{screenshot: true, screenshotText: "Homepage"}', page);
 * });
 *
 * @example
 * // Cucumber Step
 * Given("Web: Open Browser -url: {param} -options: {param}", openBrowser);
 *
 * @throws Error if page is not initialized or navigation fails.
 */
export declare function openBrowser(page: Page, url: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Navigate by Path -relativePath: {param} -options: {param}
 *
 * Appends a relative path to the current page's URL and navigates to it.
 *
 * @param relativePath - The path to append (e.g., "/settings", "profile/edit")
 * @param options - (optional) JSON string or object:
 *   - screenshot: [boolean] Capture a screenshot after navigation. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *
 * @example
 *  Web: Navigate by Path -relativePath: "/profile/edit" -options: "{screenshot: true, screenshotText: 'Profile Page'}"
 */
export declare function navigateByPath(page: Page, relativePath: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Fill -field: {param} -value: {param} -options: {param}
 *
 * Fills a form input field (e.g., text box, textarea) with the specified value.
 *
 * @param field - The label, placeholder, id, name, or pattern of the input field (e.g., "Username", "Email", "search").
 * @param value - The text value to fill in the input field (e.g., "JohnDoe", "test@example.com").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Timeout in ms (default: 30000)
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - screenshot: [boolean] Capture a screenshot after filling the input. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *   - screenshotField: [boolean] Capture screenshot of the field (input element) only. Overrides fullPage. Default: false.
 *
 * @example
 *  Web: Fill -field: "Username" -value: "JohnDoe" -options: "{screenshot: true, screenshotText: 'After filling Username', screenshotField: true}"
 */
export declare function fill(page: Page, field: string | Locator, value: string | number, options?: string | Record<string, any>): Promise<void>;
export declare const type: typeof fill;
export declare const input: typeof fill;
export declare const set: typeof fill;
export declare const enter: typeof fill;
/**
 * Web: Click Button -field: {param} -options: {param}
 *
 * Clicks a button element on the page, identified by text, label, id, name, pattern, or locator.
 *
 * @param field - The label, text, id, name, or selector of the button to click (e.g., "Submit", "Save", "Cancel").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured testExecution > actionTimeout or 10000 milliseconds.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - screenshot: [boolean] Capture a screenshot after clicking the button. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *   - screenshotBefore: [boolean] Capture a screenshot before clicking. Default: false.
 *
 * @example
 *  Web: Click Button -field: "Register" -options: "{screenshot: true, screenshotText: 'After clicking Register'}"
 */
export declare function clickButton(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Click Link -field: {param} -options: {param}
 *
 * Clicks a link element on the page, identified by link text, label, id, name, or pattern.
 *
 * @param field - The text, label, id, name, or selector of the link to click (e.g., "Home", "Login", "Forgot Password").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - screenshot: [boolean] Capture a screenshot after clicking the link. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *   - screenshotBefore: [boolean] Capture a screenshot before clicking. Default: false.
 *
 * @example
 *  Web: Click Link -field: "Register" -options: "{screenshot: true, screenshotText: 'After clicking Register'}"
 */
export declare function clickLink(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Click tab -field: {param} -options: {param}
 *
 * Clicks a tab element on the page, identified by link text, label, id, name, or pattern.
 *
 * @param field - The text, label, id, name, or selector of the link to click (e.g., "Home", "Login", "Forgot Password").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - screenshot: [boolean] Capture a screenshot after clicking the link. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *   - screenshotBefore: [boolean] Capture a screenshot before clicking. Default: false.
 *
 * @example
 *  Web: Click tab -field: "Register" -options: "{screenshot: true, screenshotText: 'After clicking Register'}"
 */
export declare function clickTab(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Click radio button -field: {param} -options: {param}
 *
 * Selects a radio button element on the page, identified by label, text, id, name, or pattern.
 *
 * @param field - The label, text, id, name, or selector of the radio button to select (e.g., "Yes", "No", "Subscribe").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - force: [boolean] Force the action (e.g., ignore actionability checks). Default: true.
 *   - screenshot: [boolean] Capture a screenshot after selecting the radio button. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *   - screenshotBefore: [boolean] Capture a screenshot before selecting the radio button. Default: false.
 *
 * @example
 *  Web: Click radio button -field: "{radio_group:: Newsletter} Yes" -options: "{screenshot: true, screenshotText: 'After selecting Yes for Newsletter'}"
 */
export declare function clickRadioButton(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Click radio button -field: {param} -options: {param}
 *
 * Selects a radio button element on the page, identified by label, text, id, name, or pattern.
 *
 * @param field - The label, text, id, name, or selector of the radio button to select (e.g., "Yes", "No", "Subscribe").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - force: [boolean] Force the action (e.g., ignore actionability checks). Default: true.
 *   - screenshot: [boolean] Capture a screenshot after selecting the radio button. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *   - screenshotBefore: [boolean] Capture a screenshot before selecting the radio button. Default: false.
 *
 * @example
 *  Web: Click radio button -field: "{radio_group:: Newsletter} Yes" -options: "{screenshot: true, screenshotText: 'After selecting Yes for Newsletter'}"
 */
export declare function clickCheckbox(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Select Dropdown -field: {param} -value: {param} -options: {param}
 *
 * Selects a dropdown option by visible text or value.
 * Works with both native <select> elements and custom dropdowns.
 *
 * @param page - Playwright Page instance
 * @param field - Locator or label of the dropdown
 * @param value - Value or label of the option to select
 * @param options - Optional string or object containing:
 *   - actionTimeout: custom timeout
 *   - pattern: extra pattern string for locator resolution
 *   - screenshot: boolean (default false)
 *   - screenshotText: text for screenshot description
 *   - screenshotFullPage: boolean (default true)
 *   - smartIQ_refreshLoc: optional override for locator refresh key
 */
export declare function selectDropdown(page: Page, field: string | Locator, value: string | number, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Mouseover on link -field: {param} -options: {param}
 *
 * Performs a mouse hover over a link element on the page, identified by text, label, id, name, or pattern.
 *
 * @param field - The text, label, id, name, or selector of the link to hover over (e.g., "Account", "Login", "Help").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - screenshot: [boolean] Capture a screenshot after hovering over the link. Default: false.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *
 * @example
 *  Web: Mouseover on link -field: "{{top_menu}} My account" -options: "{screenshot: true, screenshotText: 'Hovered on My Account'}"
 */
export declare function mouseoverOnLink(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify header text -field: {param} -options: {param}
 *
 * Verifies that a header element's text (e.g., h1, h2, h3) matches the expected text. Supports partial or exact match, case sensitivity, and optional screenshot capture. The field parameter is the expected text, while pattern refines element selection if needed.
 *
 * @param field - The expected header text to match (e.g., "Welcome", "Dashboard").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional Action timeout in milliseconds for waiting. Default: Configured timeout.
 *   - navigationTimeout: [number] Optional Navigation timeout in milliseconds for waiting. Default: Configured timeout.
 *   - partialMatch: [boolean] Perform a partial match instead of an exact match. Default: false.
 *   - pattern: [string] Override the default pattern from config for element resolution. Default: Configured pattern in config.
 *   - ignoreCase: [boolean] Perform a case-sensitive match. Default: false.
 *   - assert: [boolean] If false, continues the test even if the verification fails. Default: true.
 *   - locator: [string] Optional locator to refine element search. Default: "". Eg:locator: locator: "xpath=(//h3[@class='module-title'])[1]"
 *   - headerType: [string] Specify a header level (e.g., "h1", "h2", "h3"). Default: Checks all headers from h1 to h4.
 *   - screenshot: [boolean] Capture a screenshot during verification. Default: true.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *
 * @example
 *  Web: Verify header text -field: "Your Account Has Been Created!" -options: "{partialMatch: true, screenshot: true, screenshotText: 'After account creation',  locator: "xpath=(//h3[@class='module-title'])[1]" }"
 */
export declare function verifyHeaderText(page: Page, expectedText: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify text on page -text: {param} -options: {param}
 *
 * Verifies that the provided text is present somewhere in the page.
 *
 * @param text - The expected text to search for on the page.
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - partialMatch: [boolean] Perform a partial match instead of an exact match. Default: false.
 *   - ignoreCase: [boolean] Perform a case-sensitive match. Default: false.
 *   - assert: [boolean] If false, logs the failure but does not throw. Default: true.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *
 * @example
 *  Web: Verify text on page -text: "Welcome back!" -options: "{partialMatch: true, screenshot: true, screenshotText: 'Verifying greeting'}"
 */
export declare function verifyTextOnPage(page: Page, text: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify text at location -field: {param} -value: {param} -options: {param}
 *
 * Verifies that the text content of an element matches the expected value.
 *
 * @param field - The label, id, name, or selector of the element to verify.
 * @param expectedText - The expected text content.
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds. Default: Configured timeout.
 *   - partialMatch: [boolean] If true, performs substring match. Default: false.
 *   - pattern: [string] Optional pattern to refine element search.
 *   - ignoreCase: [boolean] Whether the match is case-sensitive. Default: true.
 *   - assert: [boolean] If false, logs the failure but does not throw. Default: true.
 *   - screenshot: [boolean] Capture screenshot. Default: true.
 *   - screenshotText: [string] Screenshot description.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
export declare function verifyTextAtLocation(page: Page, field: string | Locator, expectedText: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify page title -text: {param} -options: {param}
 *
 * Verifies the page title matches the expected text.
 *
 * @param expectedTitle - The expected page title to match (e.g., "Your store").
 * @param options - Optional JSON string or object, supporting fields:
 *   - partial_check: [boolean] Perform partial match (default: false).
 *   - ignoreCase: [boolean] Case-sensitive match (default: true).
 *   - assert: [boolean] If false, continues the test even if the verification fails. Default: true.
 *   - screenshot: [boolean] Capture screenshot after verification (default: true).
 *   - screenshotText: [string] Description for screenshot attachment.
 *   - screenshotFullPage: [boolean] Full page screenshot (default: true).
 *
 * Example usage:
 *  * Web: Verify page title -text: "Your store" -options: "{partial_check: true, ignoreCase: false, assert: true}"
 */
export declare function verifyPageTitle(page: Page, expectedTitle: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify input field is present -field: {param} -options: {param}
 *
 * Verifies that an input field is present on the page, identified by label, text, id, name, or pattern.
 *
 * @param field - The label, text, id, name, or selector of the input field to verify (e.g., "Email", "Password").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: Configured timeout.
 *   - pattern: [string] Optional pattern to refine element search. Default: Configured pattern.
 *   - assert: [boolean] If false, continues the test even if the verification fails. Default: true.
 *   - screenshot: [boolean] Capture a screenshot during verification. Default: true.
 *   - screenshotText: [string] Text description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Capture a full page screenshot. Default: true.
 *
 * @example
 *  Web: Verify input field is present -field: "Email" -options: "{screenshot: true, screenshotText: 'Verifying Email input field'}"
 */
export declare function verifyInputFieldPresent(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify input field value -field: {param} -value: {param} -options: {param}
 *
 * Verifies that the value of an input field matches the expected value.
 *
 * @param field - The label, id, name, or selector of the input field to verify.
 * @param expectedValue - The expected value of the input field.
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds. Default: Configured timeout.
 *   - partialMatch: [boolean] If true, performs substring match. Default: false.
 *   - pattern: [string] Optional pattern to refine element search.
 *   - ignoreCase: [boolean] Whether the match is case-sensitive. Default: true.
 *   - assert: [boolean] If false, logs the failure but does not throw. Default: true.
 *   - screenshot: [boolean] Capture screenshot. Default: true.
 *   - screenshotText: [string] Screenshot description.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
export declare function verifyInputFieldValue(page: Page, field: string | Locator, expectedValue: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify Tab field Present -field: {param} -options: {param}
 *
 * Verifies that a "Tab" field is present on the page, identified by label, text, id, name, or pattern.
 *
 * @param field - The label, text, id, name, or selector of the tab to verify (e.g., "Overview", "Settings").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: from [config] or 30000.
 *   - pattern: [string] Optional pattern to refine element search.
 *   - assert: [boolean] If false, logs the failure but does not throw. Default: true.
 *   - isPresent: [boolean] Check Tab is present on the page. Default: true.
 *   - isEnabled: [boolean] Check if Tab is enabled. Default: false.
 *   - isSelected: [boolean] Check if Tab is selected. Default: false.
 *   - isNotSelected: [boolean] Check if Tab is not selected. Default: false.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
export declare function verifyTabField(page: Page, field: string | Locator, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Verify Toast Text Contains -text: {param} -options: {param}
 *
 * Verifies that a toast (notification) element appears on the page and contains the expected text.
 * Throws an error (or logs a warning if `assert: false`) if the text is not found.
 *
 * @param page - Playwright Page instance.
 * @param text - The expected substring to match within the toast notification (e.g., "Saved successfully").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Timeout in milliseconds to wait for toast visibility. Default: 30000.
 *   - pattern: [string] Optional pattern to refine toast element search (e.g., class name or attribute).
 *   - assert: [boolean] If false, logs the failure but does not throw. Default: true.
 *   - screenshot: [boolean] Capture a screenshot after verification. Default: true.
 *   - screenshotText: [string] Description label for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *
 * @example
 * Web: Verify Toast Text Contains -text: "Saved successfully"
 */
export declare function verifyToastTextContains(page: Page, text: string, options?: any): Promise<void>;
/**
 * Web: Wait for Input -field: {param} -state: {param} (enabled or disabled) -options: {param}
 *
 * Waits for an input field to become 'enabled' or 'disabled'.
 *
 * @param page - Playwright Page instance
 * @param field - Locator or label of the input field
 * @param state - Desired state: 'enabled' or 'disabled'
 * @param options - Optional string or object:
 *   - actionTimeout: [number] Optional timeout in milliseconds for waiting. Default: from [config] or 30000.
 *   - pattern: [string] Optional pattern to refine element search.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *   - smartIQ_refreshLoc: optional override for locator refresh key
 */
export declare function waitForInputState(page: Page, field: string | Locator, state: "enabled" | "disabled", options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Wait for URL -url: {param} -options: {param}
 *
 * Waits until the current page URL matches or contains the specified string or regex.
 *
 * @param url - The expected URL or substring/regex to match (e.g., "/dashboard", "https://example.com/page").
 * @param options - Optional JSON string or object:
 *   - actionTimeout: [number] Timeout in ms to wait for URL. Default: 30000.
 *   - match: [string] "exact" | "contains" . Default: "contains".
 *   - assert: [boolean] If false, logs the failure but does not throw. Default: true.
 *   - screenshot: [boolean] If true, captures screenshot. Default: false.
 *   - screenshotText: [string] Custom screenshot label.
 *   - screenshotFullPage: [boolean] Full page screenshot. Default: true.
 */
export declare function waitForUrl(page: Page, url: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Web: Press Key -key: {param} -options: {param}
 *
 * Presses a keyboard key on the page or a specific element.
 *
 * @param page - Playwright Page instance
 * @param key - The key to press (e.g., "Enter", "Tab", "ArrowDown", "a", etc.)
 * @param options - Optional string or object:
 *   - screenshot: [boolean] Capture screenshot after pressing the key. Default: false.
 *   - screenshotText: [string] Description for the screenshot. Default: "".
 *   - screenshotFullPage: [boolean] Full page screenshot. Default: true.
 *
 * @example
 *   await pressKey(page, 'Enter', { field: 'Username', screenshot: true });
 */
export declare function pressKey(page: Page, key: string, options?: string | Record<string, any>): Promise<void>;
/**
 * Takes a screenshot of the provided Playwright page.
 *
 * @param page - The Playwright Page object to capture.
 * @param options - Optional screenshot configuration. Can be a JSON string or an object.
 *   - `screenshot_text` (string): Optional text to annotate the screenshot.
 *   - `screenshot_fullPage` (boolean): Whether to capture the full page (default: true).
 * @throws Will throw an error if the page is not initialized.
 * @remarks
 * Waits for the page to load before taking the screenshot.
 */
export declare function takeScreenshot(page: Page, options?: string | Record<string, any>): Promise<void>;
//# sourceMappingURL=webActions.d.ts.map