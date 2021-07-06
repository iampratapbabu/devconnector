const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

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
}