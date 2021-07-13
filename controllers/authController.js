const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.protect =  async (req,res,next) =>{
    try{
        //get token from header
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(400).json({message:"Token Not Found Access Denied"});
        
        //verifying token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decoded.id);
        const currentUser = await User.findById(decoded.id);
        //console.log(currentUser);
        req.user=currentUser;
        next();

    }catch(err){
        res.status(400).json({
            status:"Fail00",
            message:err.message
        });
    }
};


//Login route
exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(email == " " || password == " ")
            return res.status(403).json({msg:"No credentials"});
        let user = await User.findOne({email}).select('+password');
        //console.log(password); inputted password
        //console.log(user.password); already saved password
        if(!user){
            return res.status(400).json({msg:"No User Found"});
        }
        
        //password matching
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
                expiresIn:process.env.EXPIRES_IN
            });
        }else{
            return res.status(400).json({msg:"Invalid credentials"});
        }

       res.status(200).json({
        message:"User LoggedIn Successfully",
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