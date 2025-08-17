"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _playq_1 = require("@playq");
// Loading D365 CRM pattern
const d365CrmEnable = _playq_1.vars.getConfigValue('addons.d365Crm.enable').toLowerCase().trim() === 'true';
const d365CrmVersion = _playq_1.vars.getConfigValue('addons.d365Crm.version').toLowerCase().trim();
if (d365CrmEnable && d365CrmVersion.startsWith("v"))
    _playq_1.vars.loadFileEntries(`extend/addons/d365Crm/pattern/d365CrmPattern_${d365CrmVersion}.ts`, "d365CrmLocPatterns", "pattern.d365crm");
//# sourceMappingURL=preLoader.js.map