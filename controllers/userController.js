const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');


//creating user
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

       //generating token
       const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
           expiresIn:process.env.EXPIRES_IN
       });
       
       res.status(200).json({
        message:"User Registration Successfull",
        token,
        user
       });
    }catch(err)
    {
        res.status(400).json({
            status:"Fail",
            message:err.message
        });
    }
   
};

//get all users
exports.getAllUsers = async(req,res) =>{
    try{
        const users = await User.find();
        res.status(200).json({
            TotalUsers:users.length,
            users
        })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        });
    }
};

//get single user
exports.getSingleUser = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id);  //req.user protect middleware ke through aa rha hai
        res.status(200).json({
            user
        });
        
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        });
    }
};

exports.deleteUser = async(req,res) =>{
    try{
        await User.findOneAndDelete(req.user.id);  //req.user protect middleware ke through aa rha hai
        await Profile.findOneAndDelete({user:req.user.id});
        res.status(200).json({
            msg:"User deleted"
        });
        
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        });
    }
};

