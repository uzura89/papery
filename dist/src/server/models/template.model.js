"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(mongoose) {
    const { Schema } = mongoose;
    // define Entry Schema
    const TemplateSchema = new Schema({
        userParmId: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        bodies: {
            type: [String],
            required: true,
        },
        created: {
            type: Date,
            default: Date.now,
        },
    });
    // index with userParmId
    TemplateSchema.index({ userParmId: 1 });
    // define Template model using TemplateSchema
    mongoose.model("Template", TemplateSchema);
}
exports.default = default_1;
