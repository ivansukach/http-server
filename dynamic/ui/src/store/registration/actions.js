export const CHANGE_LOGIN_SIGN_UP = 'CHANGE_LOGIN_SIGN_UP';
export const CHANGE_PASSWORD_SIGN_UP = 'CHANGE_PASSWORD_SIGN_UP';
export const CHANGE_REPEAT_PASSWORD_SIGN_UP = 'CHANGE_REPEAT_PASSWORD_SIGN_UP';
export const CHANGE_NAME_SIGN_UP = 'CHANGE_NAME_SIGN_UP';
export const CHANGE_SURNAME_SIGN_UP = 'CHANGE_SURNAME_SIGN_UP';
export const SEND_DATA_SIGN_UP = 'SEND_DATA_SIGN_UP';

export const setRepeatPasswordSignUp = repeatPassword =>({
    type: CHANGE_REPEAT_PASSWORD_SIGN_UP,
    payload: repeatPassword
});
export const sendDataToServer = (formData, ws) =>({
    type: SEND_DATA_SIGN_UP,
    payload: {formData: formData, ws: ws}
});