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
exports.dbCreateTag = void 0;
function dbCreateTag(mongoose, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const Tag = mongoose.model("Tag");
        try {
            if (!tag.userParmId || !tag.id || !tag.text.trim() || !tag.color) {
                throw new Error("Invalid input");
            }
            if (tag.text.includes(" ")) {
                throw new Error("Tag name cannot contain spaces");
            }
            // create entry
            const newTag = {
                userParmId: tag.userParmId,
                id: tag.id,
                text: tag.text,
                color: tag.color,
            };
            const createdTag = yield Tag.create(newTag);
            // return
            return createdTag;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbCreateTag = dbCreateTag;
