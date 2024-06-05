"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./page/index"));
const index_2 = __importDefault(require("./api/user/index"));
const index_3 = __importDefault(require("./api/entry/index"));
const index_4 = __importDefault(require("./api/tag/index"));
const index_5 = __importDefault(require("./api/template/index"));
const index_6 = __importDefault(require("./api/report/index"));
const index_7 = __importDefault(require("./api/premium/index"));
function default_1(app) {
    (0, index_1.default)(app);
    (0, index_2.default)(app);
    (0, index_3.default)(app);
    (0, index_4.default)(app);
    (0, index_5.default)(app);
    (0, index_6.default)(app);
    (0, index_7.default)(app);
}
exports.default = default_1;
