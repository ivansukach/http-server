import {FILL_ALL_REGISTRATION_FIELDS} from "./actions";

const defaultRegistrationState = {
    name: '',
    surname: '',
    login: ''
};
export const registrationReducer = (state = defaultRegistrationState, action) => {
    switch (action.type){
        case FILL_ALL_REGISTRATION_FIELDS:
            return action.payload
        default:

    }
    return state;
};