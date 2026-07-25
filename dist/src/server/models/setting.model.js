"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_cons_1 = require("../../common/constants/setting.cons");
function default_1(mongoose) {
    const { Schema } = mongoose;
    // define Entry Schema
    const SettingSchema = new Schema({
        userParmId: {
            type: String,
            required: "userParmId is required",
        },
        theme: {
            type: String,
            default: setting_cons_1.CONS_SETTING_THEME_LIGHT,
        },
        textSearchEnabled: {
            type: Boolean,
            default: false,
        },
        emojiPalette: {
            type: String,
            default: "",
        },
        created: {
            type: Date,
            default: Date.now,
        },
    });
    // index with userParmId
    SettingSchema.index({ userParmId: 1 });
    // define Setting model using SettingSchema
    mongoose.model("Setting", SettingSchema);
}
exports.default = default_1;
