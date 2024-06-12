"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const config_express_1 = __importDefault(require("./express/config.express"));
const PORT = 3000;
try {
  const { app } = (0, config_express_1.default)();
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
