import axios from "axios";

const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

//is function se hm har request me token bhejenge jisse bar bar hme request me particularly
// alag se token include nahi krna pre simply is function ka use kr lenge

export default setAuthToken;
