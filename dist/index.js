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
exports.dataTest = exports.api = exports.locResolve = exports.web = exports.comm = exports.faker = exports.webLocResolver = exports.logFixture = exports.webFixture = exports.apiActions = exports.webActions = exports.actions = exports.report = exports.browsers = exports.utils = exports.vars = exports.loadEnv = void 0;
// Public API surface for playq-core consumers
var env_1 = require("./helper/bundle/env");
Object.defineProperty(exports, "loadEnv", { enumerable: true, get: function () { return env_1.loadEnv; } });
exports.vars = __importStar(require("./helper/bundle/vars"));
// Useful helpers and wrappers
exports.utils = __importStar(require("./helper/util/utils"));
exports.browsers = __importStar(require("./helper/browsers/browserManager"));
exports.report = __importStar(require("./helper/report/report"));
// Actions and fixtures (opt-in imports by consumers)
exports.actions = __importStar(require("./helper/actions/commActions"));
exports.webActions = __importStar(require("./helper/actions/webActions"));
exports.apiActions = __importStar(require("./helper/actions/apiActions"));
var webFixture_1 = require("./helper/fixtures/webFixture");
Object.defineProperty(exports, "webFixture", { enumerable: true, get: function () { return webFixture_1.webFixture; } });
var logFixture_1 = require("./helper/fixtures/logFixture");
Object.defineProperty(exports, "logFixture", { enumerable: true, get: function () { return logFixture_1.logFixture; } });
var webLocFixture_1 = require("./helper/fixtures/webLocFixture");
Object.defineProperty(exports, "webLocResolver", { enumerable: true, get: function () { return webLocFixture_1.webLocResolver; } });
var customFaker_1 = require("./helper/faker/customFaker");
Object.defineProperty(exports, "faker", { enumerable: true, get: function () { return customFaker_1.faker; } });
// Friendly aliases for common imports
exports.comm = __importStar(require("./helper/actions/commActions"));
var web_1 = require("./helper/actions/web");
Object.defineProperty(exports, "web", { enumerable: true, get: function () { return __importDefault(web_1).default; } });
var webLocFixture_2 = require("./helper/fixtures/webLocFixture");
Object.defineProperty(exports, "locResolve", { enumerable: true, get: function () { return webLocFixture_2.webLocResolver; } });
exports.api = __importStar(require("./helper/actions/apiActions"));
var dataTest_1 = require("./helper/util/test-data/dataTest");
Object.defineProperty(exports, "dataTest", { enumerable: true, get: function () { return dataTest_1.dataTest; } });
// Note: Global bootstrap is available at subpath export "playq-core/global" if needed.
//# sourceMappingURL=index.js.map