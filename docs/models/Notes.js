"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotesSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        default: 0
    },
    notes: {
        type: Array,
        default: []
    },
});
module.exports = mongoose_1.model("notes", NotesSchema);
