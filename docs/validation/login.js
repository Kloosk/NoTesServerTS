"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const validateLoginInput = (data) => {
    const errors = [];
    data.email = data.email ? data.email : "";
    data.password = data.password ? data.password : "";
    if (validator_1.default.isEmpty(data.email)) {
        errors.push("Email field is required");
    }
    else if (!validator_1.default.isEmail(data.email)) {
        errors.push("Email is invalid");
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.push("Password field is required");
    }
    return {
        errors,
        isValid: errors
    };
};
module.exports = validateLoginInput;
