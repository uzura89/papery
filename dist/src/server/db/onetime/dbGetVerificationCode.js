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
exports.dbGetVerificationCode = void 0;
function dbGetVerificationCode(mongoose, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const OnetimeCode = mongoose.model("OnetimeCode");
        try {
            const onetimeCode = yield OnetimeCode.findOne({ key: email });
            if (!onetimeCode) {
                throw new Error("Code not found");
            }
            if (onetimeCode.expireAt < new Date()) {
                throw new Error("Code expired");
            }
            return onetimeCode.code;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbGetVerificationCode = dbGetVerificationCode;
