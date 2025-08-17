declare class WebActions {
    private attachFn?;
    private throwErrorAndAttach;
    private throwWarningAndAttach;
    private throwInfoAndAttach;
    setAttachFn(fn: (data: any, mediaType: string) => Promise<void>): void;
    private captureAndAttachScreenshot;
    private parseOptions;
}
declare const web: WebActions;
export default web;
//# sourceMappingURL=web.d.ts.map