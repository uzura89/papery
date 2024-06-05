"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addZero = exports.convertDateToString = void 0;
function convertDateToString(date) {
    // YYYY-MM-DD of local time
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
}
exports.convertDateToString = convertDateToString;
function addZero(num) {
    return num < 10 ? "0" + num : num;
}
exports.addZero = addZero;
