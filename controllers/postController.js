const Post = require('../models/postModel');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

exports.createPost = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id);
        const newPost = new Post({
            text:req.body.text,
            name: user.name,
            avatar:user.avatar,
            user:req.user.id
        });
        const post = await newPost.save();
        res.status(200).json({
            post
        });

    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        })
    }
    res.send("This is create post");
};

exports.getPosts = async(req,res) =>{
    try{
        const posts = await Post.find().sort({date:-1});
        res.status(200).json({
            totalPosts:posts.length,
            posts
        })
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
    

};

exports.getSinglePost = async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postid);
        res.status(200).json({
            post
        });
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        })
    }
};

exports.deletePost = async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postid);
        //checking user if the same user written the post then it should be deleted
        if(post.user.toString() !== req.user.id){           // .toString method ka use krenge taki userid jo user me stored hai wo string me convert ho jaye aur hm match kra ske
            return res.status(400).json({msg:"You are not the Author of this Post"});
        }
        await post.remove();
        res.status(200).json({msg:"Post deleted Successfully"});
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
};

exports.likePost = async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postid);
        //checking if post already been liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:"Post already beek liked"});
        }

        //liking the post
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.status(200).json({
            totalLikes:post.likes.length,
            likes:post.likes
        });
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
       
    }
};

exports.unlikePost = async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postid);
        //checking if post already been liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:"Post has not been liked"});
        }

        //get remove index
        const removeIndex = post.likes.map(like =>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.status(200).json({
            totalLikes:post.likes.length,
            likes:post.likes
        });
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
       
    }
};

exports.commentPost = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.postid);
        const newComment = {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        res.status(200).json({
            totalComments:post.comments.length,
            comments:post.comments
        });
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
       
    }
};

exports.deleteComment = async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postid);
        
        //pulling out the particular comment
        const comment = post.comments.find(comment => comment.id === req.params.commentid);
        //cheking comment exist or not
        if(!comment){
            return res.status(404).json({msg:"comment does not exist"});
        }
        //matching the user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:"user not authorized"});
        }

        //get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.status(200).json({
            msg:"deleted comment"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
       
    }
};



