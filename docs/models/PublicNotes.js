"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PublicNotesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "publicNotes"
    },
    publicNotes: {
        type: Array,
        default: []
    },
});
module.exports = mongoose_1.model("publicnotes", PublicNotesSchema);
