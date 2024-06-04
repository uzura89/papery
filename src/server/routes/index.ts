module.exports = function (app: any) {
  require("./page/index")(app);
  require("./api/user/index")(app);
  require("./api/entry/index")(app);
  require("./api/tag/index")(app);
  require("./api/template/index")(app);
  require("./api/report/index")(app);
  require("./api/premium/index")(app);
};
