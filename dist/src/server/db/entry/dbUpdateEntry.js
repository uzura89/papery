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
exports.dbUpdateEntry = void 0;
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbUpdateEntry(mongoose, target, newValues, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        const operator = {};
        // check if there are any new values
        if (newValues.date)
            operator["date"] = newValues.date;
        if (newValues.body)
            operator["body"] = (0, EntryEncryption_1.encryptEntry)(newValues.body);
        if (newValues.tags)
            operator["tags"] = newValues.tags;
        if (newValues.body) {
            operator["decryptedBody"] = options.decryptBody ? newValues.body : null;
        }
        try {
            // update entry
            const updatedEntry = yield Entry.findOneAndUpdate({ id: target.id, userParmId: target.userParmId }, operator, { new: true });
            // return
            return updatedEntry;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbUpdateEntry = dbUpdateEntry;
