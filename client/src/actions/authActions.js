import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../utils/setAuthToken';
import { REGISTER_SUCCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_PROFILE } from "../actions/types";



//Load user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/app/v1/users/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:AUTH_ERROR
        });
    }

}

//Register user
export const register = ({name,email,password}) => async dispatch =>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({name,email,password});
    console.log("register function: ",body);
    try{
        const res = await axios.post('/app/v1/users/auth',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());

    }catch(err){
        //alert(err);
        console.log(err);
        }
        dispatch({
            type:REGISTER_FAIL
        });
};
  



//Login User
export const login = (email,password) => async dispatch =>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body = JSON.stringify({email,password});
    console.log("Login function: ",body);
    try{
        const res = await axios.post('/app/v1/users/login',body,config);
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });

        dispatch(loadUser());

    }catch(err){
       
        
        dispatch(setAlert('Invalid Credentials','danger'));
        
        dispatch({
            type:LOGIN_FAIL
        });
    }
  
};

//logout
export const logout = () =>dispatch=>{
    dispatch({type:CLEAR_PROFILE});
    dispatch({type:LOGOUT});
   
};