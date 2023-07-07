const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    user_name : {type:String,required:true},
    user_email : {type:String,required:true},
    user_mobile : {type:Number,required:true},
    password : {type:String,required:true}
},{
    versionKey : false
});

const UserModel = mongoose.model("user",UserSchema);

module.exports = {UserModel};