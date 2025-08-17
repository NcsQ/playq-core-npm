"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestData = getTestData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const XLSX = __importStar(require("@e965/xlsx"));
/**
 * Reads test data from .json, .xlsx, or .csv
 *
 * @param file - Filename WITH extension, e.g., "login.json", "login.xlsx", "login.csv"
 * @param sheetName - (optional) Sheet name for Excel files
 */
function getTestData(file, sheetName) {
    const basePath = path_1.default.resolve(`test-data`);
    const filePath = path_1.default.join(basePath, file);
    const ext = path_1.default.extname(file).toLowerCase();
    switch (ext) {
        case '.json': {
            const raw = fs_1.default.readFileSync(filePath, 'utf-8');
            return JSON.parse(raw);
        }
        case '.xlsx': {
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { raw: false });
            // Try to parse booleans/numbers
            return rows.map(row => {
                const parsedRow = {};
                for (const key in row) {
                    const value = row[key];
                    if (value === 'true' || value === 'false') {
                        parsedRow[key] = value === 'true';
                    }
                    else if (!isNaN(value) && value.trim() !== '') {
                        parsedRow[key] = Number(value);
                    }
                    else {
                        parsedRow[key] = value;
                    }
                }
                return parsedRow;
            });
            // const workbook = XLSX.readFile(filePath);
            // const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
            // return XLSX.utils.sheet_to_json(sheet);
        }
        case '.csv': {
            const fileData = fs_1.default.readFileSync(filePath, 'utf-8');
            const worksheet = XLSX.read(fileData, { type: 'string' }).Sheets['Sheet1'];
            return XLSX.utils.sheet_to_json(worksheet);
        }
        default:
            throw new Error(`Unsupported file extension: ${ext}`);
    }
}
//# sourceMappingURL=dataLoader.js.map