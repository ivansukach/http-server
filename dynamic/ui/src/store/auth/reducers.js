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
}
export const authReducer = (state = defaultUserState, action) => {
    switch (action.type){
        case FILL_ALL_FIELDS_OF_CURRENT_USER:
            return action.payload
    }
    return state;
}