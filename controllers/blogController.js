const Blog = require('../models/blogModel');

exports.demoMiddleware = (req,res,next) =>{
  console.log("middleware runs");
  next();
};


exports.getAllBlogs = async(req,res) =>{
  const blogs = await Blog.find();
  res.status(200).json({
    status:"success",
    blogs
  });
};

exports.createBlog = async (req,res) =>{
  const blog = await Blog.create({
    title:req.body.title,
    body:req.body.body,
    category:req.body.category
  });
  res.status(201).json({
       status:"success",
       blog
   });
}


exports.getSingleBlog = (req,res) =>{
  console.log(req.params.id);
  res.send("Getting single blog");
}


exports.updateSingleBlog = (req,res) =>{
  console.log(req.params.id);
  res.send("Updating single blog");
}

exports.deleteSingleBlog = (req,res) =>{
  console.log(req.params.id);
  res.send("deleting single blog");
}
