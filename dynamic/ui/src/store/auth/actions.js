export const SET_LOGIN = 'SET_LOGIN';
export const SET_PASSWORD = 'SET_PASSWORD';
// export const SEND_AUTH_DATA = 'SEND_AUTH_DATA';
export const PUT_DATA = 'PUT_DATA';
export const LOAD_DATA = 'LOAD_DATA';
export const UNAUTHENTICATED ='UNAUTHENTICATED';

export const putData = (dataFromServer) => {
    return {
        type: PUT_DATA,
        payload: dataFromServer
    };
};

export const loadData = () => {
    return {
        type: LOAD_DATA
    };
};

export const unauthenticated = () => {
    return {
        type: UNAUTHENTICATED
    };
};


// export const setCurrentUser = (login, password)=>({
//     type: SEND_AUTH_DATA,
//     payload: {login: login, password: password}
// });
export const setLogin = (login)=>({
    type: SET_LOGIN,
    payload: login
});
export const setPassword = (password)=>({
    type: SET_PASSWORD,
    payload: password
});
