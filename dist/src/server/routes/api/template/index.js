"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../common/constants");
const serveCreateTemplate_1 = require("./serveCreateTemplate");
const serveDeleteTemplate_1 = require("./serveDeleteTemplate");
const serveFetchAllTemplates_1 = require("./serveFetchAllTemplates");
const serveUpdateTemplate_1 = require("./serveUpdateTemplate");
function default_1(app) {
    app.get(constants_1.CONS_ENDPOINT_FETCH_ALL_TEMPLATES, serveFetchAllTemplates_1.serveFetchAllTemplates);
    app.post(constants_1.CONS_ENDPOINT_CREATE_TEMPLATE, serveCreateTemplate_1.serveCreateTemplate);
    app.post(constants_1.CONS_ENDPOINT_UPDATE_TEMPLATE, serveUpdateTemplate_1.serveUpdateTemplate);
    app.post(constants_1.CONS_ENDPOINT_DELETE_TEMPLATE, serveDeleteTemplate_1.serveDeleteTemplate);
}
exports.default = default_1;
