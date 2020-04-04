import {LOAD_DATA_SIGN_IN, PUT_DATA_SIGN_IN, UNAUTHENTICATED_SIGN_IN,
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
    rememberMe: false,
    redirect: undefined,
    ws: undefined
};

export const authReducer = (state = defaultUserState, action) => {

    switch (action.type){
        case LOAD_DATA_SIGN_IN:
            return {...state, login: action.payload.formData.login, password: action.payload.formData.password,
                rememberMe: action.payload.formData.rememberMe, ws: action.payload.ws};
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
