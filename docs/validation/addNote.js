"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const validateAddNote = (data) => {
    const errors = [];
    data.title = data.title ? data.title : "";
    data.text = data.text ? data.text : "";
    data.titleColor = data.titleColor ? data.titleColor : "";
    data.titleBg = data.titleBg ? data.titleBg : "";
    data.textColor = data.textColor ? data.textColor : "";
    data.textBg = data.textBg ? data.textBg : "";
    data.border = data.border ? data.border : "";
    data.borderSize = data.borderSize ? data.borderSize : "";
    data.font = data.font ? data.font : "";
    data.textSize = data.textSize ? data.textSize : "";
    data.titleSize = data.titleSize ? data.titleSize : "";
    data.textTransform = data.textTransform ? data.textTransform : "";
    data.titleTransform = data.titleTransform ? data.titleTransform : "";
    data.alignDesc = data.alignDesc ? data.alignDesc : "";
    if (validator_1.default.isEmpty(data.title)) {
        errors.push("Title is required");
    }
    if (validator_1.default.isEmpty(data.text)) {
        errors.push("Text is required");
    }
    if (validator_1.default.isEmpty(data.titleColor)) {
        errors.push("Title color is required");
    }
    else if (!validator_1.default.isHexColor(data.titleColor)) {
        errors.push("Incorrect value of title color");
    }
    if (validator_1.default.isEmpty(data.textColor)) {
        errors.push("Text color is required");
    }
    else if (!validator_1.default.isHexColor(data.textColor)) {
        errors.push("Incorrect value of text color");
    }
    if (validator_1.default.isEmpty(data.textBg)) {
        errors.push("Text bg color is required");
    }
    else if (!validator_1.default.isHexColor(data.textBg)) {
        errors.push("Incorrect value of text bg color");
    }
    if (validator_1.default.isEmpty(data.titleBg)) {
        errors.push("Title bg color is required");
    }
    else if (!validator_1.default.isHexColor(data.titleBg)) {
        errors.push("Incorrect value of title bg color");
    }
    if (validator_1.default.isEmpty(data.border)) {
        errors.push("Border color is required");
    }
    else if (!validator_1.default.isHexColor(data.border)) {
        errors.push("Incorrect value of border color");
    }
    if (validator_1.default.isEmpty(data.borderSize + "")) {
        errors.push("Border size is required");
    }
    else if (!validator_1.default.isInt(data.borderSize + "", { min: 0, max: 15 })) {
        errors.push("Incorrect value of border size");
    }
    if (validator_1.default.isEmpty(data.font)) {
        errors.push("Font is required");
    }
    if (validator_1.default.isEmpty(data.textSize + "")) {
        errors.push("Text size is required");
    }
    else if (!validator_1.default.isFloat(data.textSize + "", { min: 0.1, max: 10 })) {
        errors.push("Incorrect value of text size");
    }
    if (validator_1.default.isEmpty(data.titleSize + "")) {
        errors.push("Title size is required");
    }
    else if (!validator_1.default.isFloat(data.titleSize + "", { min: 0.1, max: 10 })) {
        errors.push("Incorrect value of title size");
    }
    if (validator_1.default.isEmpty(data.textTransform)) {
        errors.push("Text transform is required");
    }
    if (validator_1.default.isEmpty(data.titleTransform)) {
        errors.push("Title transform is required");
    }
    if (validator_1.default.isEmpty(data.alignDesc)) {
        errors.push("Align text is required");
    }
    return {
        errors,
        isValid: errors
    };
};
module.exports = validateAddNote;
