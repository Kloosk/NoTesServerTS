"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const validateRegisterInput = (data) => {
    const errors = [];
    data.name = data.name ? data.name : "";
    data.email = data.email ? data.email : "";
    data.password = data.password ? data.password : "";
    data.password2 = data.password2 ? data.password2 : "";
    if (validator_1.default.isEmpty(data.name)) {
        errors.push("Name field is required");
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.push("Email field is required");
    }
    else if (!validator_1.default.isEmail(data.email)) {
        errors.push("Email is invalid");
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.push("Password field is required");
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.push("Confirm password field is required");
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.push("Password must be at least 6 characters");
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.push("Passwords must match");
    }
    return {
        errors,
        isValid: errors
    };
};
module.exports = validateRegisterInput;
