/**
 * Generate a valid Singapore NRIC or FIN number according to official NRIC/FIN checksum rules.
 *
 * Rules:
 *  - The prefix is 'S' or 'T' for Singaporeans/PRs, 'F' or 'G' for foreigners.
 *  - 'S' and 'F' are for those registered before 2000, 'T' and 'G' for 2000 and after.
 *  - The 7 digits: first two are year of birth/registration, next five are random.
 *  - The checksum character is calculated using weights [2,7,6,5,4,3,2] and a modulo-11 algorithm.
 *  - For 'T' and 'G', add 4 to the sum before modulo.
 *  - The checksum character set differs for citizen/PR ('S','T') and foreigner ('F','G') prefixes.
 * See: https://en.wikipedia.org/wiki/National_Registration_Identity_Card#Structure
 */
/**
 * Options for NRIC generation.
 */
export interface NRICOptions {
    prefix?: string;
    yearOfBirth?: number;
}
/**
 * Generate a valid Singapore NRIC or FIN number according to official NRIC/FIN checksum rules.
 * @param options - Options for NRIC generation.
 * @returns A valid NRIC string.
 */
export declare function generateNRIC(options?: NRICOptions): string;
/**
    Function to extract the year from an NRIC number
    @param nric - The NRIC number as a string
    @returns The year of birth as a number, or null if the NRIC is invalid
 */
declare function getYearFromNRIC(nric: string): number | null;
export { getYearFromNRIC };
//# sourceMappingURL=nric.d.ts.map