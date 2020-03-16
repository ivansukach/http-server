import {SEND_AUTH_DATA, PUT_DATA, loadData, UNAUTHENTICATED} from "./actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

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
        case SEND_AUTH_DATA:
            return { ...state, login: action.payload.login, password: action.payload.password};
        case PUT_DATA:
            return { ...state, name: action.payload.name, surname: action.payload.surname, photo: action.payload.photo,
            accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, isAuthenticated: true};
        case UNAUTHENTICATED:
            return { ...state, isAuthenticated: false};
        default:
    }
    return state;
};
