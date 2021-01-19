import {Schema,model} from 'mongoose'

// Create Schema
const PublicNotesSchema = new Schema({
    name:{
        type: String,
        default: "publicNotes"
    },
    publicNotes:{
        type: Array,
        default: []
    },
});

module.exports = model("publicnotes", PublicNotesSchema);