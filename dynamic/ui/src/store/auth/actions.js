export const FILL_ALL_FIELDS_OF_CURRENT_USER = 'FILL_ALL_FIELDS_OF_CURRENT_USER';
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

export const setCurrentUser = login =>({
    type: FILL_ALL_FIELDS_OF_CURRENT_USER,
    payload: login
});