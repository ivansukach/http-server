export const SEND_AUTH_DATA = 'SEND_AUTH_DATA';
export const PUT_DATA = 'PUT_DATA';
export const LOAD_DATA = 'LOAD_DATA';

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


export const setCurrentUser = (login, password)=>({
    type: SEND_AUTH_DATA,
    payload: {login: login, password: password}
});