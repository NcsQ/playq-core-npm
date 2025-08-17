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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const loadEnv = (env) => {
    // Setting PlayQ Project Root
    if (!process.env['PLAYQ_PROJECT_ROOT']) {
        process.env['PLAYQ_PROJECT_ROOT'] = findProjectRoot();
    }
    // Setting PlayQ Core Root
    process.env['PLAYQ_CORE_ROOT'] = path.resolve(process.env['PLAYQ_PROJECT_ROOT'], 'src');
    // Setting PlayQ Defaults
    if (!process.env.PLAYQ_REPORT_OPEN)
        process.env.PLAYQ_REPORT_OPEN = 'true';
    // Setting PlayQ Runner
    if (process.env.PLAYQ_RUNNER && ['bdd', 'cuke', 'cucumber'].includes(process.env.PLAYQ_RUNNER.trim())) {
        process.env.PLAYQ_RUNNER = 'cucumber';
    }
    else {
        process.env.PLAYQ_RUNNER = 'playwright';
    }
    let envPath;
    let playqEnvMem = undefined;
    let playqRunnerMem = process.env['PLAYQ_RUNNER'];
    if (process.env['PLAYQ_ENV'])
        playqEnvMem = process.env['PLAYQ_ENV'];
    if (env) {
        envPath = path.resolve(process.env.PLAYQ_PROJECT_ROOT, 'environments', `${env}.env`);
        dotenv.config({
            override: true,
            path: envPath
        });
    }
    else {
        if (process.env.PLAYQ_ENV) {
            process.env.PLAYQ_ENV = process.env.PLAYQ_ENV.trim();
            envPath = path.resolve(process.env.PLAYQ_PROJECT_ROOT, 'environments', `${process.env.PLAYQ_ENV}.env`);
            dotenv.config({
                override: true,
                path: envPath
            });
        }
        else {
            console.warn("NO ENVIRONMENTS PASSED or PLAYQ_ENV is undefined!");
        }
    }
    process.env['PLAYQ_RUNNER'] = playqRunnerMem; // Override any environment config for PLAYQ_RUNNER.
    if (playqEnvMem)
        process.env['PLAYQ_ENV'] = playqEnvMem;
    // Loading variables from vars.ts - use dynamic import to avoid circular dependency
    try {
        const { initVars } = require('./vars');
        if (typeof initVars === 'function') {
            initVars();
        }
    }
    catch (error) {
        console.warn('Warning: Could not initialize vars:', error.message);
    }
};
exports.loadEnv = loadEnv;
function findProjectRoot() {
    // Method 1: Check for environment variable
    if (process.env.PLAYQ_PROJECT_ROOT) {
        return process.env.PLAYQ_PROJECT_ROOT;
    }
    // Method 2: Walk up from cwd to find package.json
    let currentDir = process.cwd();
    while (currentDir !== path.dirname(currentDir)) {
        if (fs.existsSync(path.join(currentDir, 'package.json'))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    // Method 3: Fallback to cwd
    return process.cwd();
}
//# sourceMappingURL=env.js.map