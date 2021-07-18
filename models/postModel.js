const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user:{
      type:mongoose.Schema.ObjectId,
      ref:'User'
  },
  text:{
      type:String,
      required:true
  },
  name:{
      type:String
  },
  avatar:{
      type:String
  },
  likes:[
      {
          user:{
              type:mongoose.Schema.ObjectId,
              ref:'User'
          }
      }
  ],
  comments:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        text:{
            type:String
        },
        name:{
            type:String
        },
        avatar:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
   
  ],
  date:{
    type:Date,
    default:Date.now
    }
});

postSchema.pre('save',function(next){
    console.log("postpre function runs");
    next();
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
