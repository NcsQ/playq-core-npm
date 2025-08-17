interface CurrentDateTimeOptions {
    format?: string;
}
export declare function generateCurrentDateTime(options?: CurrentDateTimeOptions): string;
interface AddMonthsOptions {
    inputFormat?: 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' | 'DD-MM-YY' | 'MM-DD-YY' | 'YY-MM-DD' | 'DD/MM/YY' | 'MM/DD/YY' | 'YY/MM/DD';
    outputFormat?: 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' | 'DD-MM-YY' | 'MM-DD-YY' | 'YY-MM-DD' | 'DD/MM/YY' | 'MM/DD/YY' | 'YY/MM/DD';
    clampToLastDayOfMonth?: boolean;
}
export declare function addMonthsToDate(dateStr: string, months: number | string, options?: AddMonthsOptions): string;
/**
 * Removes leading zeros from both the day and month in a date string of format DD/MM/YYYY.
 * Example: '03/07/2025' => '3/7/2025'
 * @param dateStr - The date string in DD/MM/YYYY format
 * @returns The date string with leading zeros removed from day and month
 */
export declare function removeLeadingZeroFromMonthAndDate(dateStr: string): string;
export {};
//# sourceMappingURL=dateTime.d.ts.map