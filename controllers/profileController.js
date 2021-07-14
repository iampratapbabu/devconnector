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
        if(skills){
             profileFields.skills=skills.split(',').map(skill=>skill.trim());
        }

        //build social object
        profileFields.social={};
        if(youtube) profileFields.social.youtube=youtube;
        if(instagram) profileFields.social.instagram=instagram;
        if(twitter) profileFields.social.twitter=twitter;
        if(linkedin) profileFields.social.linkedin=linkedin;

        let profile = await Profile.findOne({user:req.user.id});
        //update
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}  
            );
            return res.json(profile);
        }
        //creating profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
    
   
};

exports.getAllProfiles = async(req,res) =>{
    try{
        const profiles = await Profile.find();
        res.status(200).json({
            "Total Profiles":profiles.length,
            profiles
        });

    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
};

exports.getUserProfile = async(req,res) =>{
    try{
        const profile = await Profile.findOne({user:req.params.userid});
        if(!profile){
            return res.status(400).json({msg:"There is NO Profile for this user id"})
        }
        res.status(200).json({
            profile
        });

    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
};

exports.profileEducation = async(req,res) =>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        if(!profile){
            return res.status(400).json({msg:"There is NO Profile for this user id"})
        }
        res.status(200).json({
            profile
        });

    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
};

exports.profileExperience = async(req,res) =>{
    try{
        const {title,company,location,from,to,current,description} = req.body;
        const newExp = {title,company,location,from,to,current,description};
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        //unshift is an array method like push
        //we are pushing newExp object in experience array
        await profile.save();

        res.status(200).json({
            profile
        });

    }catch(err){
        res.status(500).json({
            status:"SERVER ERROR",
            message:err.message
        });
    }
};
