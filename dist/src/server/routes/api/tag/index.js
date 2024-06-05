"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../common/constants");
const serveCombineTags_1 = require("./serveCombineTags");
const serveCreateTag_1 = require("./serveCreateTag");
const serveDeleteTag_1 = require("./serveDeleteTag");
const serveFetchAllTags_1 = require("./serveFetchAllTags");
const serveUpdateTag_1 = require("./serveUpdateTag");
function default_1(app) {
    app.get(constants_1.CONS_ENDPOINT_FETCH_ALL_TAGS, serveFetchAllTags_1.serveFetchAllTags);
    app.post(constants_1.CONS_ENDPOINT_CREATE_TAG, serveCreateTag_1.serveCreateTag);
    app.post(constants_1.CONS_ENDPOINT_UPDATE_TAG, serveUpdateTag_1.serveUpdateTag);
    app.post(constants_1.CONS_ENDPOINT_DELETE_TAG, serveDeleteTag_1.serveDeleteTag);
    app.post(constants_1.CONS_ENDPOINT_COMBINE_TAGS, serveCombineTags_1.serveCombineTags);
}
exports.default = default_1;
