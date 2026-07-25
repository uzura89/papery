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
function dbFetchEntriesByDate(mongoose, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            const entries = yield Entry.find(Object.assign({ userParmId: options.userParmId, date: options.date }, (options.onlyPublished && { draft: false }))).lean();
            return entries;
        }
        catch (error) {
            return [];
        }
    });
}
exports.default = dbFetchEntriesByDate;
