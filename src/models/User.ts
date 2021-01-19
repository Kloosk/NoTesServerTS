import {Schema,model} from 'mongoose'

const UserSchema:Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
});

module.exports = model("users", UserSchema);