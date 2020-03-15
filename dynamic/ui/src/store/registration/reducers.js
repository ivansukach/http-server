import {CHANGE_LOGIN} from "./actions";
import {CHANGE_PASSWORD} from "./actions";

const defaultRegistrationState = {
    name: '',
    surname: '',
    login: ''
};
export const registrationReducer = (state = defaultRegistrationState, action) => {
    switch (action.type){
        case CHANGE_LOGIN:
            return {...state, login: action.payload};
        case CHANGE_PASSWORD:
            return {...state, password: action.payload};
        default:

    }
    return state;
};