"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveUpdateTheme = void 0;
const dbUpdateSettings_1 = require("../../../db/setting/dbUpdateSettings");
function serveUpdateTheme(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        const { theme } = req.body;
        try {
            // const isPremium = await dbCheckIfPremiumUser(req.mongoose, userParmId);
            // if (!isPremium) {
            //   return res.status(403).json({
            //     message: "Unauthorized",
            //   });
            // }
            const setting = yield (0, dbUpdateSettings_1.dbUpdateSetting)(req.mongoose, userParmId, {
                theme,
            });
            return res.status(200).json({ theme: setting.theme });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveUpdateTheme = serveUpdateTheme;
