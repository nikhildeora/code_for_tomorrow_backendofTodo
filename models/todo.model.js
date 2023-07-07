const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    task : {type:String,required:true},
    status : {type:Boolean,required:true},
    editable : {type:Boolean,required:true}
},{
    versionKey : false
});

const TodoModel = mongoose.model("todo",TodoSchema);

module.exports = {TodoModel};

// taskDate : {type:Date,required:true},
