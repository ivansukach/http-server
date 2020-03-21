import {LOAD_DATA_SIGN_IN, PUT_DATA_SIGN_IN, SET_LOGIN_SIGN_IN, SET_PASSWORD_SIGN_IN, UNAUTHENTICATED_SIGN_IN,
    REDIRECT_TO_MAIN_PAGE} from "./actions";
import {} from "../registration/actions";

export const defaultUserState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    photo: '',
    coins: 0,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
    redirect: null
};

export const authReducer = (state = defaultUserState, action) => {

    switch (action.type){
        // case SEND_AUTH_DATA:
        //     return { ...state, login: action.payload.login, password: action.payload.password};
        case SET_LOGIN_SIGN_IN:
            return {...state, login: action.payload};
        case SET_PASSWORD_SIGN_IN:
            return {...state, password: action.payload};
        case LOAD_DATA_SIGN_IN:
            return {...state, login: action.payload.login, password: action.payload.password};
        case PUT_DATA_SIGN_IN:
            return { ...state, name: action.payload.name, surname: action.payload.surname, photo: action.payload.photo,
            accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, isAuthenticated: true};
        case UNAUTHENTICATED_SIGN_IN:
            return { ...state, isAuthenticated: false};
        case REDIRECT_TO_MAIN_PAGE:
            return {...state, redirect: "/main"};
        default:
    }
    return state;
};
