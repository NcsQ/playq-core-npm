// Public API surface for playq-core consumers
export { loadEnv } from './helper/bundle/env';
export * as vars from './helper/bundle/vars';

// Useful helpers and wrappers
export * as utils from './helper/util/utils';
export * as browsers from './helper/browsers/browserManager';
export * as report from './helper/report/report';

// Actions and fixtures (opt-in imports by consumers)
export * as actions from './helper/actions/commActions';
export * as webActions from './helper/actions/webActions';
export * as apiActions from './helper/actions/apiActions';
export { webFixture } from './helper/fixtures/webFixture';
export { logFixture } from './helper/fixtures/logFixture';
export { webLocResolver } from './helper/fixtures/webLocFixture';
export { faker } from './helper/faker/customFaker';

// Note: Global bootstrap is available at subpath export "playq-core/global" if needed.
