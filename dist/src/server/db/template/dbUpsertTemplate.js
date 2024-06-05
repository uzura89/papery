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
exports.dbUpsertTemplate = void 0;
function dbUpsertTemplate(mongoose, userParmId, template) {
    return __awaiter(this, void 0, void 0, function* () {
        const Template = mongoose.model("Template");
        try {
            // update template
            const updatedTemplate = yield Template.findOneAndUpdate({ userParmId, id: template.id }, {
                name: template.name,
                bodies: template.bodies,
            }, { new: true, upsert: true });
            // return
            return updatedTemplate;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbUpsertTemplate = dbUpsertTemplate;
