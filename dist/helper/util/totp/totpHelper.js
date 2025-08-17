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
exports.TOTPHelper = void 0;
const otplib_1 = require("otplib");
const QRCode = __importStar(require("qrcode"));
class TOTPHelper {
    constructor(secret, serviceName = 'PlayQ', accountName = 'automation') {
        this.secret = secret || this.generateSecret();
        this.serviceName = serviceName;
        this.accountName = accountName;
        // Configure otplib options
        otplib_1.authenticator.options = {
            window: 2, // Allow 2 time steps tolerance
            step: 30 // 30-second time step
        };
    }
    /**
     * Generate a new TOTP secret
     */
    generateSecret() {
        return otplib_1.authenticator.generateSecret();
    }
    /**
     * Generate current TOTP token
     */
    generateToken() {
        return otplib_1.authenticator.generate(this.secret);
    }
    /**
     * Verify TOTP token
     */
    verifyToken(token) {
        return otplib_1.authenticator.verify({
            token,
            secret: this.secret
        });
    }
    /**
     * Get OTP Auth URL for QR code generation
     */
    getOtpAuthUrl() {
        return otplib_1.authenticator.keyuri(this.accountName, this.serviceName, this.secret);
    }
    /**
     * Generate QR code for authenticator app setup
     */
    async generateQRCode() {
        const otpAuthUrl = this.getOtpAuthUrl();
        return await QRCode.toDataURL(otpAuthUrl);
    }
    /**
     * Get the secret (for environment variable storage)
     */
    getSecret() {
        return this.secret;
    }
    /**
     * Check if current time is near token expiry
     */
    getTimeRemaining() {
        const epoch = Math.round(Date.now() / 1000.0);
        const timeStep = 30;
        return timeStep - (epoch % timeStep);
    }
    /**
     * Generate token with retry logic for time window
     */
    async generateTokenWithRetry(maxRetries = 3) {
        let attempts = 0;
        while (attempts < maxRetries) {
            const timeRemaining = this.getTimeRemaining();
            // If token expires soon, wait for new window
            if (timeRemaining < 5) {
                console.log(`Token expires in ${timeRemaining}s, waiting for new window...`);
                await new Promise(resolve => setTimeout(resolve, (timeRemaining + 1) * 1000));
            }
            const token = this.generateToken();
            console.log(`Generated TOTP token: ${token.substring(0, 3)}*** (${this.getTimeRemaining()}s remaining)`);
            return token;
        }
        throw new Error('Failed to generate TOTP token after retries');
    }
}
exports.TOTPHelper = TOTPHelper;
//# sourceMappingURL=totpHelper.js.map