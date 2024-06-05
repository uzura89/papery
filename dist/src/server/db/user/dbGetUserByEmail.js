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
exports.dbGetUserByEmail = void 0;
function dbGetUserByEmail(mongoose, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const User = mongoose.model("User");
        try {
            const user = yield User.findOne({
                email,
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.dbGetUserByEmail = dbGetUserByEmail;
