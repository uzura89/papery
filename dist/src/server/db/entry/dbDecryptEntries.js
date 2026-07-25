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
exports.dbDecryptEntries = void 0;
const EntryEncryption_1 = require("./modules/EntryEncryption");
function dbDecryptEntries(mongoose, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const Entry = mongoose.model("Entry");
        try {
            // get entries
            const entries = yield Entry.find({
                userParmId: params.userParmId,
            }).lean();
            // create bulk operation
            const bulkOps = entries.map((entry) => {
                return {
                    updateOne: {
                        filter: {
                            id: entry.id,
                        },
                        update: {
                            $set: {
                                decryptedBody: (0, EntryEncryption_1.decryptEntry)(entry.body),
                            },
                        },
                    },
                };
            });
            // update entries
            yield Entry.bulkWrite(bulkOps);
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbDecryptEntries = dbDecryptEntries;
