import { faker as baseFaker } from '@faker-js/faker';
export declare const faker: typeof baseFaker & {
    custom: {
        passport: (options?: {
            countryCode?: string;
        }) => string;
        mobile: {
            number: (options?: {
                countryCode?: string;
                dialCodePrefix?: boolean;
            }) => string;
        };
        postcode: {
            get: (options?: {
                countryCode?: string;
                stateCode?: string;
            }) => string;
        };
        person: {
            fullName: (options?: {
                gender?: "male" | "female";
                withPrefix?: boolean;
                maxLength?: number;
            }) => string;
            birthDate: (options?: {
                min?: number;
                max?: number;
                year?: number;
                format?: "DD-MM-YYYY" | "MM-DD-YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD" | "DD-MM-YY" | "MM-DD-YY" | "YY-MM-DD" | "DD/MM/YY" | "MM/DD/YY" | "YY/MM/DD";
            }) => string;
        };
        nric: {
            generate: (options?: {
                prefix?: "S" | "T" | "F" | "G";
                yearOfBirth?: number;
            }) => string;
            getYear: (nric: string) => string;
        };
        datetime: {
            /**
             *
             * @param options Eg: {'format': 'DD/MM/YYYY HH:mm:ss'}, {'format': 'YY-MM-DD HH.mm'}
             * @returns
             */
            generateCurrentDateTime: (options?: {
                format?: string;
            }) => string;
            addMonthsToDate: (dateStr: string, months: number | string, options?: {
                inputFormat?: "DD-MM-YYYY" | "MM-DD-YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD" | "DD-MM-YY" | "MM-DD-YY" | "YY-MM-DD" | "DD/MM/YY" | "MM/DD/YY" | "YY/MM/DD";
                outputFormat?: "DD-MM-YYYY" | "MM-DD-YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD" | "DD-MM-YY" | "MM-DD-YY" | "YY-MM-DD" | "DD/MM/YY" | "MM/DD/YY" | "YY/MM/DD";
                clampToLastDayOfMonth?: boolean;
            }) => string;
        };
    };
};
//# sourceMappingURL=customFaker.d.ts.map