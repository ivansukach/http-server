export const FILL_ALL_FIELDS_OF_CURRENT_USER = 'FILL_ALL_FIELDS_OF_CURRENT_USER';

export const setCurrentUser = login =>({
    type: FILL_ALL_FIELDS_OF_CURRENT_USER,
    payload: login
});