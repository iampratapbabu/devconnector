import React,{Fragment,useState,useEffect} from 'react';
import{withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createProfile,getCurrentProfile } from '../../actions/profileActions';

const EditProfile = ({profile:{profile,loading},createProfile,getCurrentProfile,history}) => {
    const [formData,setFormData] = useState({
        company:"",
        website:"",
        location:"",
        status:"",
        skills:"",
        githubusername:"",
        bio:"",
        twitter:"",
        facebook:"",
        instagram:"",
        linkedin:"",
        youtube:""
    });

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        instagram,
        linkedin,
        youtube
    } = formData;

    //handling form data
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = e => {
      e.preventDefault();
      
      console.log(" i am onSubmit");
      console.log(formData);
      createProfile(formData,history);
    };

    //toggling social links button
    const [displaySocialInputs,toggleSocialInputs] = useState(false);
    console.log(profile);
    useEffect(() => {
      console.log("getcurrentprofile runs");
      getCurrentProfile();

      setFormData({
        company:loading || !profile.company?"":profile.company,
        website:loading || !profile.website?"":profile.website,
        location:loading || !profile.location?"":profile.location,
        status:loading || !profile.status?"":profile.status,
        skills:loading || !profile.skills?"":profile.skills.join(','),
        githubusername:loading || !profile.githubusername?"":profile.githubusername,
        bio:loading || !profile.bio?"":profile.bio,
        twitter:loading || !profile.social?"":profile.social.twitter,
        facebook:loading || !profile.social?"":profile.social.facebook,
        instagram:loading || !profile.social?"":profile.social.instagram,
        linkedin:loading || !profile.social?"":profile.social.linkedin,
        youtube:loading || !profile.social?"":profile.social.youtube
      });
      //eslint-disable-next-line
    },[]);

    return (
        <Fragment>
            <section class="container">
      <h1 class="large text-primary">
        Create Your Profile
      </h1>
      <p class="lead">
        <i class="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small class="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          <small class="form-text">Could be your own company or one you work for</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange}/>
          <small class="form-text">Could be your own or a company website</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
          <small class="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange}/>
          <small class="form-text">Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={onChange}
          />
          <small class="form-text">
            If you want your latest repos and a Github link, include your
            username</small>
        </div>
        <div class="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
          <small class="form-text">Tell us a little about yourself</small>
        </div>

        <div class="my-2">
          <button type="button" class="btn btn-light" onClick={()=>toggleSocialInputs(!displaySocialInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
            {displaySocialInputs && <Fragment>
              <div class="form-group social-input">
          <i class="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange}/>
        </div>
            </Fragment>}
        
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </section>
        </Fragment>
    )
};
console.log("editprofile");

EditProfile.propTypes={
  createProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    profile:state.profileReducer
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));
