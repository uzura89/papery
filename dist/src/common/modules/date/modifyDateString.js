"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyDateStringYear = exports.modifyDateString = void 0;
const convertDateToString_1 = require("./convertDateToString");
function modifyDateString(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const newDateString = (0, convertDateToString_1.convertDateToString)(newDate);
    return newDateString;
}
exports.modifyDateString = modifyDateString;
function modifyDateStringYear(date, years) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    const newDateString = (0, convertDateToString_1.convertDateToString)(newDate);
    return newDateString;
}
exports.modifyDateStringYear = modifyDateStringYear;
