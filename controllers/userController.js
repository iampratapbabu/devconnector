const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');


//
exports.createUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already Registered"});
        }
      
        //creating gravatar
       const avatar = gravatar.url(email,{
           s:'200',
           r:'pg',
           d:'mm'
       });

       user = new User({
           name,
           email,
           avatar,
           password
       });
       //console.log(user);

       //password hashing
       const salt = await bcrypt.genSalt(12);
       user.password = await bcrypt.hash(password,salt);
       await user.save();
       
       res.status(200).json({
        message:"User Registration Successfull",
        user
       });
    }catch(err)
    {
        res.status(400).json({
            status:"Fail",
            message:err
        });
    }
   
};