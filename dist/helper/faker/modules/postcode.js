"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidPostCode = getValidPostCode;
// src/helper/faker/modules/passport.ts
const faker_1 = require("@faker-js/faker");
const postcodes_valid_sg_json_1 = __importDefault(require("./data/postcodes_valid_sg.json"));
function getValidPostCode(options = {}) {
    // export function getValidPostCode(countryCode: string = "AU", stateCode?: string): string {
    const { countryCode = "AU", stateCode = "" } = options;
    switch (countryCode.toUpperCase()) {
        case "SG": {
            return faker_1.faker.helpers.arrayElement(postcodes_valid_sg_json_1.default);
        }
        case "AU":
            const AU_STATE_RANGES = {
                "NSW": [2000, 2999],
                "ACT": [2600, 2639],
                "VIC": [3000, 3999],
                "QLD": [4000, 4999],
                "SA": [5000, 5799],
                "WA": [6000, 6797],
                "TAS": [7000, 7799],
                "NT": [800, 899]
            };
            if (stateCode) {
                const range = AU_STATE_RANGES[stateCode.toUpperCase()];
                if (!range) {
                    throw new Error(`Unsupported state code: ${stateCode}`);
                }
                const [min, max] = range;
                const postcodeLength = max.toString().length;
                const postcode = faker_1.faker.number.int({ min, max }).toString().padStart(postcodeLength, '0');
                return postcode;
            }
            // If no state is specified, choose a random state and generate a postcode
            const randomState = faker_1.faker.helpers.arrayElement(Object.keys(AU_STATE_RANGES));
            const [min, max] = AU_STATE_RANGES[randomState];
            const postcodeLength = max.toString().length;
            const postcode = faker_1.faker.number.int({ min, max }).toString().padStart(postcodeLength, '0');
            return postcode;
        default:
            throw new Error(`Unsupported country code: ${countryCode}`);
    }
}
//# sourceMappingURL=postcode.js.map