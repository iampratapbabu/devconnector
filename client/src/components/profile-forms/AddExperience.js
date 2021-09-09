import React,{Fragment,useState} from 'react';
import { Link,withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addExperience } from '../../actions/profileActions';

const AddExperience = ({addExperience,history}) => {
    const [formData,setFormData] = useState({
        company:"",
        title:"",
        location:"",
        from:"",
        to:"",
        current:false,
        description:""
    });

    const [toDateDisabled, toggleDisabled] = useState(false);
    const {company,title,location,from,to,current,description} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        console.log(formData);
        addExperience(formData);

    }

    return (
       <Fragment>
               <section class="container">
      <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current}
          onChange= {e =>{setFormData({...formData,current:!current});
          toggleDisabled(!toDateDisabled)}} /> Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={onChange}
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </section>
       </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired
}

export default connect(null,{addExperience})(AddExperience);
