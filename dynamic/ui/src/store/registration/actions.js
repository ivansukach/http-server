export const CHANGE_LOGIN_SIGN_UP = 'CHANGE_LOGIN_SIGN_UP';
export const CHANGE_PASSWORD_SIGN_UP = 'CHANGE_PASSWORD_SIGN_UP';
export const CHANGE_NAME_SIGN_UP = 'CHANGE_NAME_SIGN_UP';
export const CHANGE_SURNAME_SIGN_UP = 'CHANGE_SURNAME_SIGN_UP';
export const SEND_DATA_SIGN_UP = 'SEND_DATA_SIGN_UP';

export const setLoginSignUp = login =>({
    type: CHANGE_LOGIN_SIGN_UP,
    payload: login
});
export const setPasswordSignUp = password =>({
    type: CHANGE_PASSWORD_SIGN_UP,
    payload: password
});
export const setNameSignUp = name =>({
    type: CHANGE_NAME_SIGN_UP,
    payload: name
});
export const setSurnameSignUp = surname =>({
    type: CHANGE_SURNAME_SIGN_UP,
    payload: surname
});
export const sendDataToServer = (login, password, name, surname) =>({
    type: SEND_DATA_SIGN_UP,
    payload: {login: login, password: password, name: name, surname: surname}
});