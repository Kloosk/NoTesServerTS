"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = require('../config/keys');
module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access Denied');
    try {
        req.user = jsonwebtoken_1.default.verify(token, secret.secretOrKey);
        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token ' + e);
    }
};
