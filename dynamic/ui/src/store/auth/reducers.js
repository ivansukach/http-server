import {PUT_DATA, SET_LOGIN, SET_PASSWORD, UNAUTHENTICATED} from "./actions";

export const defaultUserState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    photo: '',
    coins: 0,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false
};

export const authReducer = (state = defaultUserState, action) => {

    switch (action.type){
        // case SEND_AUTH_DATA:
        //     return { ...state, login: action.payload.login, password: action.payload.password};
        case SET_LOGIN:
            return {...state, login: action.payload}
        case SET_PASSWORD:
            return {...state, password: action.payload}
        case PUT_DATA:
            return { ...state, name: action.payload.name, surname: action.payload.surname, photo: action.payload.photo,
            accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, isAuthenticated: true};
        case UNAUTHENTICATED:
            return { ...state, isAuthenticated: false};
        default:
    }
    return state;
};
