"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePersonFullName = generatePersonFullName;
exports.generateBirthDate = generateBirthDate;
const faker_1 = require("@faker-js/faker");
function generatePersonFullName(options = {}) {
    const { gender, withPrefix = false, maxLength } = options;
    let firstName = faker_1.faker.person.firstName(gender);
    let lastName = faker_1.faker.person.lastName(gender);
    let fullName = withPrefix
        ? `${faker_1.faker.person.prefix(gender)} ${firstName} ${lastName}`
        : `${firstName} ${lastName}`;
    if (maxLength && fullName.length > maxLength) {
        // Try trimming last name first, then first name
        lastName = lastName.slice(0, Math.max(1, Math.floor((maxLength - firstName.length - 1))));
        fullName = withPrefix
            ? `${faker_1.faker.person.prefix(gender)} ${firstName} ${lastName}`
            : `${firstName} ${lastName}`;
        if (fullName.length > maxLength) {
            firstName = firstName.slice(0, Math.max(1, maxLength - lastName.length - 1));
            fullName = withPrefix
                ? `${faker_1.faker.person.prefix(gender)} ${firstName} ${lastName}`
                : `${firstName} ${lastName}`;
        }
    }
    return fullName.replace(/-/g, ' ');
}
function generateBirthDate(options = {}) {
    const { min = 18, max = 65, year, format = 'DD-MM-YYYY' } = options;
    let date;
    // const date = faker.date.birthdate({ min, max, mode: 'age' });
    if (year) {
        // Generate a random date in the given year
        const month = faker_1.faker.number.int({ min: 0, max: 11 });
        const day = faker_1.faker.number.int({ min: 1, max: 28 }); // Safe for all months
        date = new Date(year, month, day);
    }
    else {
        date = faker_1.faker.date.birthdate({ min, max, mode: 'age' });
    }
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const yy = String(yyyy).slice(-2);
    switch (format) {
        case 'YYYY-MM-DD':
            return `${yyyy}-${mm}-${dd}`;
        case 'YYYY/MM/DD':
            return `${yyyy}/${mm}/${dd}`;
        case 'MM-DD-YYYY':
            return `${mm}-${dd}-${yyyy}`;
        case 'MM/DD/YYYY':
            return `${mm}/${dd}/${yyyy}`;
        case 'DD/MM/YYYY':
            return `${dd}/${mm}/${yyyy}`;
        case 'DD-MM-YYYY':
            return `${dd}-${mm}-${yyyy}`;
        case 'DD-MM-YY':
            return `${dd}-${mm}-${yy}`;
        case 'MM-DD-YY':
            return `${mm}-${dd}-${yy}`;
        case 'YY-MM-DD':
            return `${yy}-${mm}-${dd}`;
        case 'DD/MM/YY':
            return `${dd}/${mm}/${yy}`;
        case 'MM/DD/YY':
            return `${mm}/${dd}/${yy}`;
        case 'YY/MM/DD':
            return `${yy}/${mm}/${dd}`;
        default:
            return `${dd}-${mm}-${yyyy}`;
    }
}
//# sourceMappingURL=person.js.map