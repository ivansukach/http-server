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

export const loadDataToRequest = (formData, ws) => {
    return {
        type: LOAD_DATA_SIGN_IN,
        payload: {formData, ws}
    };
};

export const unauthenticated = () => {
    return {
        type: UNAUTHENTICATED_SIGN_IN
    };
};

export const redirectToMainPage = () =>({
    type: REDIRECT_TO_MAIN_PAGE
});
