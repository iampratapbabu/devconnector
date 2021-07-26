import React,{Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { setAlert } from '../actions/alertActions';
import { register } from '../actions/authActions';
import PropTypes from 'prop-types'

const Register = (props) => {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });
    const {name,email,password,password2} = formData;
    const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        if(password !== password2){
            props.setAlert("Password Do Not Match",'danger');
        }else{
          console.log(formData);
            props.register({name,email,password});
        }
        
    };
    //redirect id logged in
    if(props.isAuthenticated){
      return <Redirect to='/dashboard' />;
    }
    return (
        <Fragment>
      <h1 class="large text-primary">Sign Up</h1>
      <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>

      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
           type="text"
           placeholder="Name" 
           name="name" 
           value={name} 
           onChange={onChange} 
           required />
        </div>
        <div class="form-group">
          <input type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email} 
          onChange={onChange}/>
          <small class="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} 
            onChange={onChange}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
        </Fragment>
    )
};

Register.propTypes ={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
  isAuthenticated:state.authReducer.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,register})(Register);
