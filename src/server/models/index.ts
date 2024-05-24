module.exports = function (mongoose: any) {
  require("./user.model")(mongoose);
  require("./entry.model")(mongoose);
  require("./tag.model")(mongoose);
  require("./template.model")(mongoose);
  require("./report.model")(mongoose);
  require("./onetimecode.model")(mongoose);
};
