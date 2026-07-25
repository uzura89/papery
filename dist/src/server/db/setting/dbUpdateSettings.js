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
exports.dbUpdateSetting = void 0;
const setting_cons_1 = require("../../../common/constants/setting.cons");
function dbUpdateSetting(mongoose, userParmId, newValues) {
    return __awaiter(this, void 0, void 0, function* () {
        const Setting = mongoose.model("Setting");
        try {
            // update setting
            let setting = yield Setting.findOne({ userParmId });
            if (!setting) {
                yield Setting.create({
                    userParmId,
                    theme: setting_cons_1.CONS_SETTING_THEME_LIGHT,
                    textSearchEnabled: false,
                });
                setting = yield Setting.findOne({ userParmId });
            }
            // update
            if (typeof newValues.theme === "string") {
                setting.theme = newValues.theme;
            }
            if (typeof newValues.textSearchEnabled === "boolean") {
                setting.textSearchEnabled = newValues.textSearchEnabled;
            }
            if (typeof newValues.emojiPalette === "string") {
                setting.emojiPalette = newValues.emojiPalette;
            }
            // save
            yield setting.save();
            // return
            return setting;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbUpdateSetting = dbUpdateSetting;
