import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR,UPDATE_PROFILE } from "../actions/types";

const initialState={
    profile:null,
    profiles:[],
    loading:true,
    error:{}
};

//eslint-disable-next-line
export default function(state = initialState,action) {
    switch(action.type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile:action.payload,
                loading:false
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                loading:false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                error:action.payload,
                loading:false
            };
        default:
            return state;
    }
}
