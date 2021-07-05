const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A Name is Required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"An Email is Required"]
    },
    password:{
        type:String,
        required:[true,"A Password is Required"],
        minLength:6,
        select:false
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
   
});
//pre funnction controller se pehle yeha req run hota hai
userSchema.pre('save',function(next){
    console.log("pre function runs in userSchema");
    next();
});

//here we can write premethods on userSchema if we want

const User = mongoose.model('User',userSchema);
module.exports = User;