export const SET_LOGIN_SIGN_IN = 'SET_LOGIN_SIGN_IN';
export const SET_PASSWORD_SIGN_IN = 'SET_PASSWORD_SIGN_IN';
export const PUT_DATA_SIGN_IN = 'PUT_DATA_SIGN_IN';
export const LOAD_DATA_SIGN_IN = 'LOAD_DATA_SIGN_IN';
export const UNAUTHENTICATED_SIGN_IN ='UNAUTHENTICATED_SIGN_IN';
export const REDIRECT_TO_MAIN_PAGE = 'REDIRECT_TO_MAIN_PAGE';

export const putDataFromServer = (dataFromServer) => {
    return {
        type: PUT_DATA_SIGN_IN,
        payload: dataFromServer
    };
};

export const loadDataToRequest = (login, password) => {
    return {
        type: LOAD_DATA_SIGN_IN,
        payload: {login: login, password: password}
    };
};

export const unauthenticated = () => {
    return {
        type: UNAUTHENTICATED_SIGN_IN
    };
};

export const setLoginSignIn = (login)=>({
    type: SET_LOGIN_SIGN_IN,
    payload: login
});
export const setPasswordSignIn = (password)=>({
    type: SET_PASSWORD_SIGN_IN,
    payload: password
});
export const redirectToMainPage = () =>({
    type: REDIRECT_TO_MAIN_PAGE
});
