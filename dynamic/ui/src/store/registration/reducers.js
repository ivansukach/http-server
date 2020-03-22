import {
    CHANGE_LOGIN_SIGN_UP,
    CHANGE_PASSWORD_SIGN_UP,
    CHANGE_NAME_SIGN_UP,
    CHANGE_SURNAME_SIGN_UP,
    SEND_DATA_SIGN_UP, CHANGE_REPEAT_PASSWORD_SIGN_UP
} from "./actions";
export const defaultRegistrationState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    repeatPassword: '',
    redirect: null
};

export const registrationReducer = (state = defaultRegistrationState, action) => {
    switch (action.type){
        case CHANGE_LOGIN_SIGN_UP:
            return {...state, login: action.payload};
        case CHANGE_PASSWORD_SIGN_UP:
            return {...state, password: action.payload};
        case CHANGE_REPEAT_PASSWORD_SIGN_UP:
            return {...state, repeatPassword: action.payload};
        case CHANGE_NAME_SIGN_UP:
            return {...state, name: action.payload};
        case CHANGE_SURNAME_SIGN_UP:
            return {...state, surname: action.payload};
        case SEND_DATA_SIGN_UP:
            return {...state,login: action.payload.login, password: action.payload.password,
                repeatPassword: action.payload.repeatPassword, name: action.payload.name, surname: action.payload.surname};
        default:

    }
    return state;
};