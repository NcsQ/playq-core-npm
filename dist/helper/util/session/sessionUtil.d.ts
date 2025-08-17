import { Browser, BrowserContext, Page } from '@playwright/test';
export declare function saveSession(page: Page, sessionName: string, additionalUrls?: string[]): Promise<void>;
export declare function saveSessionSimplified(page: Page, sessionName: string, additionalUrls?: string[]): Promise<void>;
/**
 * Load session with improved error handling
 */
export declare function loadSession(browser: Browser, filePath: string, warmOrigins?: string[]): Promise<{
    context: BrowserContext;
    page: Page;
}>;
/**
 * Load session into existing context without creating new browser/page
 * Auto-discovers origins from saved session data - no need to pass URLs
 */
export declare function loadSessionIntoExistingContext(page: Page, sessionName: string, additionalUrls?: string[]): Promise<void>;
/**
 * Delete session file
 */
export declare function deleteSession(filePath: string): void;
/**
 * Checks if the session file exists and is not older than maxAgeHours.
 * @param filePath - Path to the session file.
 * @param maxAgeHours - Maximum allowed age in hours.
 * @returns true if session file exists and is valid, false otherwise.
 */
export declare function isSessionValid(sessionName: string, maxAgeHours?: number): boolean;
//# sourceMappingURL=sessionUtil.d.ts.map