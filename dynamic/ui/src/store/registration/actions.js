export const FILL_ALL_REGISTRATION_FIELDS = 'FILL_ALL_REGISTRATION_FIELDS';

export const setRegisteredUser = (    name, surname, login) =>({
    type: FILL_ALL_REGISTRATION_FIELDS,
    payload: { name: name, surname: surname, login: login}
});