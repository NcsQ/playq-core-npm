"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faker = void 0;
// src/helper/faker/customFaker.ts
const faker_1 = require("@faker-js/faker");
const passport_1 = require("./modules/passport");
const mobile_1 = require("./modules/mobile");
const postcode_1 = require("./modules/postcode");
const person_1 = require("./modules/person");
const nric_1 = require("./modules/nric");
const dateTime_1 = require("./modules/dateTime");
faker_1.faker.custom = {
    passport: passport_1.generatePassportNumber,
    mobile: {
        number: mobile_1.generateMobileNumber
    },
    postcode: {
        get: postcode_1.getValidPostCode
    },
    person: {
        fullName: person_1.generatePersonFullName,
        birthDate: person_1.generateBirthDate
    },
    nric: {
        generate: nric_1.generateNRIC,
        getYear: nric_1.getYearFromNRIC
    },
    datetime: {
        generateCurrentDateTime: dateTime_1.generateCurrentDateTime,
        addMonthsToDate: dateTime_1.addMonthsToDate
    }
};
exports.faker = faker_1.faker;
// // src/helper/faker/customFaker.ts
// import { faker as baseFaker } from '@faker-js/faker';
// import { generatePassportNumber } from './modules/passport';
// import { generateMobileNumber } from './modules/mobile';
// (baseFaker as any).passport = {
//   number: generatePassportNumber
// };
// export const faker = baseFaker as typeof baseFaker & {
//   passport: {
//     number: (countryCode?: string) => string;
//   };
// };
//# sourceMappingURL=customFaker.js.map