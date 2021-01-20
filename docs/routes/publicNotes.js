"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verify = require('../auth/verifyToken');
const PublicNotes = require("../models/PublicNotes");
router.get("/publicnotes", verify, (req, res) => {
    PublicNotes.findOne({ name: "publicNotes" })
        .then((notes) => res.status(200).json(notes.publicNotes))
        .catch((err) => res.status(400).json({ err }));
});
module.exports = router;
