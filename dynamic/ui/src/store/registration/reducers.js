import {CHANGE_LOGIN} from "./actions";
import {CHANGE_PASSWORD} from "./actions";
import {defaultUserState} from "../auth/reducers";

export const registrationReducer = (state = defaultUserState, action) => {
    // console.log(state);
    switch (action.type){
        case CHANGE_LOGIN:
            return {...state, login: action.payload};
        case CHANGE_PASSWORD:
            return {...state, password: action.payload};
        default:

    }
    return state;
};