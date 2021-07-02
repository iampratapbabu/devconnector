const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:{
        type:String,
        unique:true,
        required:[true,'A Title is Required for the blog'],
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
    slug:String,
    body:{
        type:String,
        required:[true,"Please Provide the Blog body"]
    },
    category:{
        type:String,
        required:[true,'Please Choose a category'],
        enum:{
            values:['Tech','Non-Tech','Confess'],
            message:"Please choose from Tech, Non-Tech and Confess"
        }
    }
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;
