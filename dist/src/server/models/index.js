"use strict";
// module.exports = function (mongoose: any) {
//   require("./user.model")(mongoose);
//   require("./entry.model")(mongoose);
//   require("./tag.model")(mongoose);
//   require("./template.model")(mongoose);
//   require("./report.model")(mongoose);
//   require("./onetimecode.model")(mongoose);
// };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// commonjs version
const user_model_1 = __importDefault(require("./user.model"));
const entry_model_1 = __importDefault(require("./entry.model"));
const tag_model_1 = __importDefault(require("./tag.model"));
const template_model_1 = __importDefault(require("./template.model"));
const report_model_1 = __importDefault(require("./report.model"));
const onetimecode_model_1 = __importDefault(require("./onetimecode.model"));
function default_1(mongoose) {
    (0, user_model_1.default)(mongoose);
    (0, entry_model_1.default)(mongoose);
    (0, tag_model_1.default)(mongoose);
    (0, template_model_1.default)(mongoose);
    (0, report_model_1.default)(mongoose);
    (0, onetimecode_model_1.default)(mongoose);
}
exports.default = default_1;
