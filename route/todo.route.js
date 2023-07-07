const express = require("express");
const TodoRoute = express.Router();
const {TodoModel} = require("../models/todo.model.js");

TodoRoute.get("/", async (req,res)=>{
    try {
        const data =  await TodoModel.find();
        res.send(data); 
    } catch (error) {
        res.send({message : "There is an error while getting todos",error : error.message});
    }
});

TodoRoute.post("/post", async (req,res)=>{
    try {
        const todo = new TodoModel(req.body);
        await todo.save();
        res.send({message:"todo created successfully"});
    } catch (error) {
        res.send({message : "There is an error while posting todos",error : error.message});
    }
})

TodoRoute.patch("/update/:id", async (req,res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        await TodoModel.findByIdAndUpdate({_id:ID},payload);
        res.send({message:"Todo updated successfully"});
    } catch (error) {
        res.send({message : "There is an error while ipdating todos",error : error.message});
    }
});

TodoRoute.delete("/delete/:id", async (req,res)=>{
    const ID = req.params.id;
    try {
       await TodoModel.findByIdAndDelete(ID);
       res.send({message : "todo deleted successfully"});   
    } catch (error) {
        res.send({message : "There is an error while deleting todos",error : error.message});
    }
});

module.exports = {TodoRoute};