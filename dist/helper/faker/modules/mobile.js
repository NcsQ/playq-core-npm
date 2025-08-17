"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMobileNumber = generateMobileNumber;
// src/helper/faker/modules/mobile.ts
const faker_1 = require("@faker-js/faker");
function generateMobileNumber(options) {
    const { countryCode = 'AU', dialCodePrefix = true } = options || {};
    switch (countryCode.toUpperCase()) {
        case "AU": {
            const prefix = "04";
            const digits = faker_1.faker.string.numeric(8);
            return dialCodePrefix ? `+61${prefix.slice(1)}${digits}` : `${prefix}${digits}`;
        }
        case "SG": {
            const allowedPrefixes = ["855", "955"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(5);
            return dialCodePrefix ? `+65${prefix}${digits}` : `${prefix}${digits}`;
        }
        case "IN": {
            const allowedPrefixes = ["6", "7", "8", "9"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(9);
            return dialCodePrefix ? `+91${prefix}${digits}` : `${prefix}${digits}`;
        }
        case "US": {
            const allowedPrefixes = ["2", "3", "4", "5", "6", "7", "8", "9"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(7);
            return dialCodePrefix ? `+1${prefix}${digits}` : `${prefix}${digits}`;
        }
        case "UK": {
            const allowedPrefixes = ["7", "8", "9"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(8);
            return dialCodePrefix ? `+44${prefix}${digits}` : `${prefix}${digits}`;
        }
        case "CA": {
            const allowedPrefixes = ["2", "3", "4", "5", "6", "7", "8", "9"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(7);
            return dialCodePrefix ? `+1${prefix}${digits}` : `${prefix}${digits}`;
        }
        case "NZ": {
            const allowedPrefixes = ["2", "3", "4", "5", "6", "7", "8", "9"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(7);
            return dialCodePrefix ? `+64${prefix}${digits}` : `${prefix}${digits}`;
        }
        case "PH": {
            const allowedPrefixes = ["8", "9"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(7);
            return dialCodePrefix ? `+63${prefix}${digits}` : `${prefix}${digits}`;
        }
        default:
            throw new Error(`Unsupported country code: ${countryCode}`);
    }
}
//# sourceMappingURL=mobile.js.map