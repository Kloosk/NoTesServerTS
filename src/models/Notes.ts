import {Schema,model} from 'mongoose'

// Create Schema
const NotesSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    num:{
        type: Number,
        default: 0
    },
    notes:{
        type: Array,
        default: []
    },
});

module.exports = model("notes", NotesSchema);