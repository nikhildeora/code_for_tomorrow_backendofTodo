const express = require("express");
const UserRoute = express.Router();
const {UserModel} = require("../models/user.model.js");
const bcrypt = require("bcrypt");

UserRoute.get("/", async (req,res)=>{
    try {
        let users = await UserModel.find();     
        res.send(users);
    } catch (error) {
        res.send({message : "There is an error while getting user",error : error.message});
    }
});

UserRoute.post("/register", async (req,res)=>{
    const {user_name,user_email,user_mobile,password} = req.body;
    try {
       let findUserByMobile = await UserModel.find({user_mobile});
       let findUserByEmail = await UserModel.find({user_email});
       if(findUserByMobile.length==0 && findUserByEmail.length==0){
          bcrypt.hash(password,4, async (err,hashed_pass) =>{
            if(err){
                res.send({message : "There is an error while registring user",error : err.message});
            }else{
                let new_user = new UserModel({user_name,user_email,user_mobile,password : hashed_pass});
                await new_user.save();
                res.send({message:"user created successfully"});
            }
          })
       }
       else{
        res.send({message:"user Already exist"});
       }
    } catch (error) {
        res.send({message : "There is an error while registring user",error : error.message});
    }
})
UserRoute.post("/login", async (req,res)=>{
    const {cred , pass} = req.body;
    console.log("body",req.body);
    let CredIsNumber = Number(cred);
    console.log(CredIsNumber);
    try {
        let findUser;
        if(CredIsNumber){
            findUser = await UserModel.find({user_mobile:cred});
        }else{
            findUser = await UserModel.find({user_email:cred});
        }
        if(findUser.length!==0){
            console.log("here",findUser);
            const hashpass = await bcrypt.compare(pass, findUser[0].password);
            console.log("hashpass",hashpass);
            if(hashpass){
                res.send({message : "user logged in successfully",user : findUser[0]._id}); 
            }
            else{
                res.send({message : "Wrong Credentials"})
            }
        }else{
            res.send({message : "Wrong Credentials"})
        }
    } catch (error) {
        res.send({message : "There is an error while login user",error : error.message});
    }
})


module.exports = {UserRoute};