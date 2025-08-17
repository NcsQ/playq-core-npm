"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassportNumber = generatePassportNumber;
// src/helper/faker/modules/passport.ts
const faker_1 = require("@faker-js/faker");
function generatePassportNumber(options) {
    const { countryCode = 'AU' } = options;
    switch (countryCode.toUpperCase()) {
        case "IN":
            return `${faker_1.faker.string.alpha({
                length: 1,
                casing: "upper",
            })}${faker_1.faker.string.numeric(7)}`;
        case "UK":
            return `${faker_1.faker.string.alpha({
                length: 2,
                casing: "upper",
            })}${faker_1.faker.string.numeric(7)}`;
        case "US":
            return faker_1.faker.string.numeric(9);
        case "AU": {
            const allowedPrefixes = ["PA", "PB", "PC", "PD", "PE", "PF", "PU", "PW", "PX", "PZ"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(7);
            return `${prefix}${digits}`;
        }
        case "SG": {
            const allowedPrefixes = ["E", "K", "S"];
            const prefix = faker_1.faker.helpers.arrayElement(allowedPrefixes);
            const digits = faker_1.faker.string.numeric(7);
            return `${prefix}${digits}`;
        }
        default:
            throw new Error(`Unsupported country code: ${countryCode}`);
    }
}
//# sourceMappingURL=passport.js.map