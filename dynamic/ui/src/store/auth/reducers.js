import {SEND_AUTH_DATA, PUT_DATA, loadData} from "./actions";
import {useDispatch} from "react-redux";

const defaultUserState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    photo: '',
    coins: 0,
    accessToken: '',
    refreshToken: '',
    data: {}
};

export const authReducer = (state = defaultUserState, action) => {
    // const dispatch = useDispatch();
    // const onClick = () => dispatch(loadData());
    switch (action.type){
        case SEND_AUTH_DATA:
            // dispatch(loadData());

            return { ...state, login: action.payload.login, password: action.payload.password};
        case PUT_DATA:
            return { ...state, name: action.payload.name, surname: action.payload.surname, photo: action.payload.photo,
            accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken};
        default:
    }
    return state;
};
