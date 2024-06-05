// commonjs version
import UserModel from "./user.model";
import EntryModel from "./entry.model";
import TagModel from "./tag.model";
import TemplateModel from "./template.model";
import ReportModel from "./report.model";
import OnetimeCodeModel from "./onetimecode.model";
import SettingModel from "./setting.model";

export default function (mongoose: any) {
  UserModel(mongoose);
  EntryModel(mongoose);
  TagModel(mongoose);
  TemplateModel(mongoose);
  ReportModel(mongoose);
  OnetimeCodeModel(mongoose);
  SettingModel(mongoose);
}
