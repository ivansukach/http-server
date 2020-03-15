import { takeEvery, put, call } from 'redux-saga/effects';
import {LOAD_DATA, putData} from "./auth/actions";
import {store} from "../App"
function fetchSignInData() {
    const latestState = store.getState();
    console.log("latestState: ", latestState);
    // const data = {login: latestState.auth.login,
    //     password: latestState.auth.password};
    // const signIn = document.getElementById("SignIn")
    // const formData = new FormData(signIn);
    // formData.login = "aaaa";
    return fetch('http://localhost:8081/signIn',{method: 'POST', body: JSON.stringify(latestState.auth),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json());
}
// store.subscribe(fetchSignInData);
function* workerLoadData() {
    console.log('it is working');
    const data = yield call(fetchSignInData);
    yield put(putData(data));
}

export function* watchLoadData() {
    console.log("Data should be loaded");
    yield takeEvery(LOAD_DATA, workerLoadData)
}