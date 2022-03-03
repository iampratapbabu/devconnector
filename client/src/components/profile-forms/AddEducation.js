import React,{Fragment,useState} from 'react';
import { Link,withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addEducation } from '../../actions/profileActions';

const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData] = useState({
        school:"",
        degree:"",
        fieldofstudy:"",
        from:"",
        to:"",
        current:false,
        description:""
    });

    const [toDateDisabled, toggleDisabled] = useState(false);
    const {school,degree,fieldofstudy,from,to,current,description} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        console.log(formData);
        addEducation(formData);

    };

    return (
       <Fragment>
               <section class="container">
      <h1 class="large text-primary">
       Add Education
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input type="text" placeholder="* School" name="school" value={school} onChange={onChange} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
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

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
}

export default connect(null,{addEducation})(AddEducation);
