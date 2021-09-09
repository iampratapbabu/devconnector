import axios from 'axios';
import {setAlert} from './alertActions';

import { GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE } from './types';

//GET USER PROFILE
export const getCurrentProfile = () => async dispatch =>{
    try{
        const res = await axios.get('/app/v1/users/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};

//create or update profile
export const createProfile = (formData,history,edit = false) => async dispatch=>{
    try{
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post('/app/v1/users/profile',formData,config);
        

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

        dispatch(setAlert(edit?'Profiel updated':'Profile Created','success'));
        if(!edit){
            history.push('/dashboard');
        }
    }catch(err){
        //server se response aa rha hai use catch krke show kr rhe hain
        let errors = err.response;
        //console.log(errors);
        //console.log(errors.status);
        //console.log(errors.statusText);
        alert(`ERROR CODE: ${errors.status} Message: ${errors.statusText}`);
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};

//ADD EXPERIENCE
export const addExperience = (formData,history) => async dispatch => {
    try{
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.put('app/v1/users/profile/experience',formData,config);
        

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Experience added','success'));
        history.push('/dashboard');
        
    }catch(err){
        //server se response aa rha hai use catch krke show kr rhe hain
        let errors = err.response;
        //console.log(errors);
        //console.log(errors.status);
        //console.log(errors.statusText);
        alert(`ERROR CODE: ${errors.status} Message: ${errors.statusText}`);
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};

//ADD EDUCATION
export const addEducation = (formData,history) => async dispatch => {
    try{
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res = await axios.put('/app/v1/users/profile/education',formData,config);
        

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Education added','success'));
      
        history.push('/dashboard');
        
    }catch(err){
        //server se response aa rha hai use catch krke show kr rhe hain
        let errors = err.response;
        //console.log(errors);
        //console.log(errors.status);
        //console.log(errors.statusText);
        alert(`ERROR CODE: ${errors.status} Message: ${errors.statusText}`);
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};