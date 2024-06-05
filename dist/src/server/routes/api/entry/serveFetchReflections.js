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
exports.serveFetchReflections = void 0;
const modifyDateString_1 = require("../../../../common/modules/date/modifyDateString");
const dbFetchEntries_1 = require("../../../db/entry/dbFetchEntries");
function serveFetchReflections(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userParmId } = req;
        const { today } = req.query;
        try {
            const weekAgo = (0, modifyDateString_1.modifyDateString)(today, -7);
            const weekAgoReflection = yield makeReflection(req.mongoose, userParmId, "One Week Ago", weekAgo);
            const monthAgo = (0, modifyDateString_1.modifyDateString)(today, -30);
            const monthAgoReflection = yield makeReflection(req.mongoose, userParmId, "One Month Ago", monthAgo);
            const yearAgo = (0, modifyDateString_1.modifyDateStringYear)(today, -1);
            const yearAgoReflection = yield makeReflection(req.mongoose, userParmId, "One Year Ago", yearAgo);
            // make reflections
            const reflections = [
                weekAgoReflection,
                monthAgoReflection,
                yearAgoReflection,
            ];
            return res.json({
                reflections,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });
}
exports.serveFetchReflections = serveFetchReflections;
function makeReflection(mongoose, userParmId, title, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield (0, dbFetchEntries_1.dbFetchEntries)(mongoose, userParmId, {
            date,
            draft: false,
        });
        return {
            title,
            date,
            entries: entries.map((entry) => ({
                id: entry.id,
                date: entry.date,
                body: entry.body,
            })),
        };
    });
}
