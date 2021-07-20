import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
       
        email:"",
        password:""
       
    });
    const {email,password} = formData;
    const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = e =>{
       e.preventDefault();
        console.log("form submitted");
    };
    return (
        <Fragment>
      <h1 class="large text-primary">LogIn</h1>
      <p class="lead"><i class="fas fa-user"></i> Login To Your Account</p>

      <form class="form" onSubmit={onSubmit}>
        
        <div class="form-group">
          <input type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email} 
          onChange={onChange}/>
         
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
       
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
        </Fragment>
    )
}

export default Login;
