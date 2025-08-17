declare module '@config/*';
declare module '@resources/*';
declare module '@extend/*';
declare module '@env/*';
declare module '@actions';

// Allure JS Commons minimal typings used by this project
declare module 'allure-js-commons' {
	export function step<T>(name: string, body: () => Promise<T> | T): Promise<T> | T;
	export function attachment(name: string, content: string | Buffer, type?: string): void;
}
