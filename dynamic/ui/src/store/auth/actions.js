export const FILL_ALL_FIELDS_OF_CURRENT_USER = 'FILL_ALL_FIELDS_OF_CURRENT_USER';

export const setCurrentUser = (    name, surname, login, password, photo, coins, accessToken, refreshToken) =>({
    type: FILL_ALL_FIELDS_OF_CURRENT_USER,
    payload: { name: name, surname: surname, login: login, password: password, photo: photo, coins: coins, accessToken: accessToken, refreshToken: refreshToken}
});