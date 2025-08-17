export declare class TOTPHelper {
    private secret;
    private serviceName;
    private accountName;
    constructor(secret?: string, serviceName?: string, accountName?: string);
    /**
     * Generate a new TOTP secret
     */
    generateSecret(): string;
    /**
     * Generate current TOTP token
     */
    generateToken(): string;
    /**
     * Verify TOTP token
     */
    verifyToken(token: string): boolean;
    /**
     * Get OTP Auth URL for QR code generation
     */
    getOtpAuthUrl(): string;
    /**
     * Generate QR code for authenticator app setup
     */
    generateQRCode(): Promise<string>;
    /**
     * Get the secret (for environment variable storage)
     */
    getSecret(): string;
    /**
     * Check if current time is near token expiry
     */
    getTimeRemaining(): number;
    /**
     * Generate token with retry logic for time window
     */
    generateTokenWithRetry(maxRetries?: number): Promise<string>;
}
//# sourceMappingURL=totpHelper.d.ts.map