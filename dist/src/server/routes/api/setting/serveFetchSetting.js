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
exports.serveFetchSetting = void 0;
const dbFetchSettings_1 = require("../../../db/setting/dbFetchSettings");
function serveFetchSetting(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        try {
            const setting = yield (0, dbFetchSettings_1.dbFetchSettings)(req.mongoose, userParmId);
            return res.status(200).json({ setting });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveFetchSetting = serveFetchSetting;
