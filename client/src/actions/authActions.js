import axios from 'axios';
import { setAlert } from './alertActions';
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";


//Register user
export const register = (name,email,password) => async dispatch =>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({name,email,password});
    try{
        const res = await axios.post('/app/v1/users/auth',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:REGISTER_FAIL
        });
    }
  
}