import PageRoutes from "./page/index";
import UserRoutes from "./api/user/index";
import EntryRoutes from "./api/entry/index";
import TagRoutes from "./api/tag/index";
import TemplateRoutes from "./api/template/index";
import ReportRoutes from "./api/report/index";
import PremiumRoutes from "./api/premium/index";
import SettingRoutes from "./api/setting/index";

export default function (app: any) {
  PageRoutes(app);
  UserRoutes(app);
  EntryRoutes(app);
  TagRoutes(app);
  TemplateRoutes(app);
  ReportRoutes(app);
  PremiumRoutes(app);
  SettingRoutes(app);
}
