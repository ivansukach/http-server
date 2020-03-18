export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const setLogin = login =>({
    type: CHANGE_LOGIN,
    payload: login
});
export const setPassword = password =>({
    type: CHANGE_PASSWORD,
    payload: password
});