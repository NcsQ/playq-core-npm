interface PersonNameOptions {
    gender?: 'male' | 'female';
    withPrefix?: boolean;
    maxLength?: number;
}
export declare function generatePersonFullName(options?: PersonNameOptions): string;
interface BirthDateOptions {
    min?: number;
    max?: number;
    year?: number;
    format?: 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' | 'DD-MM-YY' | 'MM-DD-YY' | 'YY-MM-DD' | 'DD/MM/YY' | 'MM/DD/YY' | 'YY/MM/DD';
}
export declare function generateBirthDate(options?: BirthDateOptions): string;
export {};
//# sourceMappingURL=person.d.ts.map