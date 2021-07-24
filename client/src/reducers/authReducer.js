import { REGISTER_SUCCESS,REGISTER_FAIL } from "../actions/types";

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,
}

//eslint-disable-next-line
export default function(action,state = initialState){
    const {payload,type} = action;

    switch(type){
        case REGISTER_SUCCESS:
            console.log("Register success runs");
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:true
            };

        default:
            return state;
    }
}