const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String,
                
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
                required:true
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            } 
        }
    ],
    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
                required:true
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            } 
        }
    ],
    social:{
        youtube:{
            type:String
        },
        instagram:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }


});

profileSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'-__v'  //minus ka sign lagake likhe hain means insb ko jaise email , gender ko selet nhi krega during populating time
    });
    next();
});
//nhi to iske alawa direct .populate('user') laga skte hai controller pr
//but ye jyada convinient rehta hai 

const Profile = mongoose.model('Profile',profileSchema);
module.exports = Profile;