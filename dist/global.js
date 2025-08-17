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
exports.dataTest = exports.api = exports.web = exports.comm = exports.faker = exports.utils = exports.logFixture = exports.webFixture = exports.webLocResolver = exports.vars = void 0;
const vars = __importStar(require("./helper/bundle/vars"));
exports.vars = vars;
const webFixture_1 = require("./helper/fixtures/webFixture");
Object.defineProperty(exports, "webFixture", { enumerable: true, get: function () { return webFixture_1.webFixture; } });
const logFixture_1 = require("./helper/fixtures/logFixture");
Object.defineProperty(exports, "logFixture", { enumerable: true, get: function () { return logFixture_1.logFixture; } });
const utils = __importStar(require("./helper/util/utils"));
exports.utils = utils;
const customFaker_1 = require("./helper/faker/customFaker");
Object.defineProperty(exports, "faker", { enumerable: true, get: function () { return customFaker_1.faker; } });
const webLocFixture_1 = require("./helper/fixtures/webLocFixture");
Object.defineProperty(exports, "webLocResolver", { enumerable: true, get: function () { return webLocFixture_1.webLocResolver; } });
const comm = __importStar(require("./helper/actions/commActions"));
exports.comm = comm;
const web = __importStar(require("./helper/actions/webActions"));
exports.web = web;
const api = __importStar(require("./helper/actions/apiActions"));
exports.api = api;
// import * as loc from '@resources/locators/loc-ts';
const dataTest_1 = require("./helper/util/test-data/dataTest");
Object.defineProperty(exports, "dataTest", { enumerable: true, get: function () { return dataTest_1.dataTest; } });
// import { addons } from '@extend/addons'
// import { engines } from '@extend/engines'
const testType = process.env.PLAYQ_TEST_TYPE || 'ui';
const allowedTypes = ['ui', 'api', 'mobile'];
globalThis.runType = allowedTypes.includes(testType)
    ? testType
    : 'ui';
globalThis.vars = vars;
globalThis.webLocResolver = webLocFixture_1.webLocResolver;
globalThis.uiFixture = webFixture_1.webFixture;
globalThis.logFixture = logFixture_1.logFixture;
globalThis.utils = utils;
globalThis.faker = customFaker_1.faker;
globalThis.comm = comm;
globalThis.web = web;
globalThis.api = api;
// globalThis.loc = loc;
globalThis.dataTest = dataTest_1.dataTest;
// export { vars, webLocResolver, webFixture, logFixture, utils, faker, comm, web, api, loc, dataTest, addons, engines };
//# sourceMappingURL=global.js.map