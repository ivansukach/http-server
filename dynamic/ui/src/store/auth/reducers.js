import {FILL_ALL_FIELDS_OF_CURRENT_USER, PUT_DATA} from "./actions";

const defaultUserState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    photo: '',
    coins: '',
    accessToken: '',
    refreshToken: '',
    data: {}
};
export const authReducer = (state = defaultUserState, action) => {
    switch (action.type){
        case FILL_ALL_FIELDS_OF_CURRENT_USER:
            return { ...state, login: action.payload};
        case PUT_DATA:
            return { ...state, data: action.payload};
        default:
    }
    return state;
};
