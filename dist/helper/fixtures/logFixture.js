"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFixture = void 0;
const winston_1 = require("winston");
const logger_1 = require("../util/logger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let logger;
exports.logFixture = {
    init(scenarioName) {
        logger = (0, winston_1.createLogger)((0, logger_1.options)(scenarioName));
    },
    get() {
        if (!logger)
            throw new Error("Logger not initialized!");
        return logger;
    },
    setLogger(log) {
        logger = log;
    },
    getLogger() {
        return logger;
    },
    async attach(name, data, type = 'application/octet-stream') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const ext = type.includes('png') ? 'png' : type.includes('jpg') ? 'jpg' : 'txt';
        const filename = `${timestamp}-${name.replace(/\s+/g, '_')}.${ext}`;
        const attachmentDir = path_1.default.resolve('logs', 'attachments');
        const filePath = path_1.default.join(attachmentDir, filename);
        fs_1.default.mkdirSync(attachmentDir, { recursive: true });
        fs_1.default.writeFileSync(filePath, data);
        logger.info(`📎 Attached file: ${filePath}`);
    }
};
// // src/hooks/logFixture.ts
// import { Logger, createLogger, format, transports } from 'winston';
// let logger: Logger;
// export const logFixture = {
//   init(scenarioName: string): void {
//     logger = createLogger({
//       level: 'info',
//       format: format.combine(
//         format.timestamp(),
//         format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
//       ),
//       transports: [new transports.Console()]
//     });
//   },
//   get(): Logger {
//     if (!logger) throw new Error("Logger not initialized!");
//     return logger;
//   }
// };
//# sourceMappingURL=logFixture.js.map