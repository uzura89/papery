// module.exports = function (mongoose: any) {
//   require("./user.model")(mongoose);
//   require("./entry.model")(mongoose);
//   require("./tag.model")(mongoose);
//   require("./template.model")(mongoose);
//   require("./report.model")(mongoose);
//   require("./onetimecode.model")(mongoose);
// };

// commonjs version
import UserModel from "./user.model";
import EntryModel from "./entry.model";
import TagModel from "./tag.model";
import TemplateModel from "./template.model";
import ReportModel from "./report.model";
import OnetimeCodeModel from "./onetimecode.model";

export default function (mongoose: any) {
  UserModel(mongoose);
  EntryModel(mongoose);
  TagModel(mongoose);
  TemplateModel(mongoose);
  ReportModel(mongoose);
  OnetimeCodeModel(mongoose);
}
