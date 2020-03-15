import {FILL_ALL_FIELDS_OF_CURRENT_USER} from "./actions";

const defaultUserState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    photo: '',
    coins: '',
    accessToken: '',
    refreshToken: ''
};
export const authReducer = (state = defaultUserState, action) => {
    console.log(state);
    switch (action.type){
        case FILL_ALL_FIELDS_OF_CURRENT_USER:
            state.login = action.payload.login;
            state.surname = action.payload.surname;
            console.log(state);
            return action.payload
        default:
    }
    return state;
}