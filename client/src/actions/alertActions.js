import { SET_ALERT,REMOVE_ALERT } from "../actions/types";
import * as uuid from 'uuid';

export const setAlert = (msg,alertType,timeout = 5000) =>dispatch =>{
    const id = uuid.v4();
    console.log("set alert runs",msg);
    dispatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    });

    setTimeout(()=>dispatch({
        type:REMOVE_ALERT,
        payload:id
    }),timeout);
}