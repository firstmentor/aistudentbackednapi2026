const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    password:String,
    role:{
        type:String,
        default :"user"
    }

},{timestamps:true})
const UserModel = mongoose.model('User', UserSchema);
module.exports =UserModel
