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
exports.dbDeleteEntry = void 0;
function dbDeleteEntry(mongoose, entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            // delete entry
            const deletedEntry = yield Entry.findOneAndDelete({
                id: entry.id,
                userParmId: entry.userParmId,
            });
            // return
            return deletedEntry.id;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbDeleteEntry = dbDeleteEntry;
