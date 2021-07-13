const Profile =  require("../models/profileModel");

exports.myProfile = async(req,res) =>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        if(!profile){
            return res.status(404).json({msg:"No profile found for this user"});
        }
        res.status(200).json({
            status:"successfull",
            profile
        });
    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
   
};


exports.createProfile = async(req,res) =>{
    try{
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            instagram,
            twitter,
            linkedin
        } = req.body;

        //building profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company=company;
        if(website) profileFields.website=website;
        if(location) profileFields.location=location;
        if(bio) profileFields.bio=bio;
        if(status) profileFields.status=status;
        if(githubusername) profileFields.githubusername=githubusername;
        if(youtube) profileFields.youtube=youtube;
        if(instagram) profileFields.instagram=instagram;
        if(twitter) profileFields.twitter=twitter;
        if(linkedin) profileFields.linkedin=linkedin;
        if(skills){
             profileFields.skills=skills.split(',').map(skill=>skill.trim());
        }
        console.log(profileFields);
        res.send("Sent");



    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
    
   
};