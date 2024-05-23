import {
  CONS_ENDPOINT_CREATE_TEMPLATE,
  CONS_ENDPOINT_DELETE_TEMPLATE,
  CONS_ENDPOINT_FETCH_ALL_TEMPLATES,
  CONS_ENDPOINT_UPDATE_TEMPLATE,
} from "../../../../common/constants";
import { serveCreateTemplate } from "./serveCreateTemplate";
import { serveDeleteTemplate } from "./serveDeleteTemplate";
import { serveFetchAllTemplates } from "./serveFetchAllTemplates";
import { serveUpdateTemplate } from "./serveUpdateTemplate";

module.exports = function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_ALL_TEMPLATES, serveFetchAllTemplates);
  app.post(CONS_ENDPOINT_CREATE_TEMPLATE, serveCreateTemplate);
  app.post(CONS_ENDPOINT_UPDATE_TEMPLATE, serveUpdateTemplate);
  app.post(CONS_ENDPOINT_DELETE_TEMPLATE, serveDeleteTemplate);
};
