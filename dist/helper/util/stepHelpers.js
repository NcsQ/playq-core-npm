"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachResolvedStep = attachResolvedStep;
exports.defineLoggedStep = defineLoggedStep;
const _playq_1 = require("@playq");
async function attachResolvedStep(thisArg, template) {
    const resolved = _playq_1.vars.replaceVariables(template);
    await thisArg.attach(`🧾 Resolved Step: ${resolved}`, 'text/plain');
}
function defineLoggedStep(pattern, implementation) {
    return function (...args) {
        const stepText = pattern.replace(/\{param\}/g, (_match, i) => `"${args[i]}"`);
        attachResolvedStep.call(this, stepText);
        return implementation.apply(this, args);
    };
}
//# sourceMappingURL=stepHelpers.js.map