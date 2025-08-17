import * as vars from './helper/bundle/vars';
import { webFixture } from './helper/fixtures/webFixture'; 
import { logFixture } from './helper/fixtures/logFixture';
import * as utils from './helper/util/utils';
import { faker } from './helper/faker/customFaker';
import { webLocResolver } from './helper/fixtures/webLocFixture';

import * as comm from './helper/actions/commActions';
import * as web from './helper/actions/webActions';
import * as api from './helper/actions/apiActions';

// import * as loc from '@resources/locators/loc-ts';
import { dataTest } from './helper/util/test-data/dataTest';
// import { addons } from '@extend/addons'
// import { engines } from '@extend/engines'


const testType = process.env.PLAYQ_TEST_TYPE || 'ui';
const allowedTypes = ['ui', 'api', 'mobile'] as const;

globalThis.runType = allowedTypes.includes(testType as any)
  ? (testType as typeof allowedTypes[number])
  : 'ui';

globalThis.vars = vars;
globalThis.webLocResolver = webLocResolver;
globalThis.uiFixture = webFixture;
globalThis.logFixture = logFixture;
globalThis.utils = utils;
globalThis.faker = faker;
globalThis.comm = comm;
globalThis.web = web;
globalThis.api = api;
// globalThis.loc = loc;
globalThis.dataTest = dataTest;
// globalThis.addons = addons;
// globalThis.engines = engines;

export { vars, webLocResolver, webFixture, logFixture, utils, faker, comm, web, api,  dataTest };
// export { vars, webLocResolver, webFixture, logFixture, utils, faker, comm, web, api, loc, dataTest, addons, engines };