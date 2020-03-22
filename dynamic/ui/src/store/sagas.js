import { takeEvery, put, call } from 'redux-saga/effects';
import {
    LOAD_DATA_SIGN_IN,
    putDataFromServer,
    loadDataToRequest,
    unauthenticated,
    redirectToMainPage
} from "./auth/actions";
import {SEND_DATA_SIGN_UP} from "./registration/actions";
import {LOAD_SLIDE_SHOW, changeSlide} from "./main/actions";
import {store} from "../App"
function fetchSignInData() {
    const latestState = store.getState();
    console.log("latestState: ", latestState);
    return fetch('http://localhost:8081/signIn',{method: 'POST', body: JSON.stringify(latestState.auth),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json());
}
function fetchSignUpData() {
    const latestStateReg = store.getState().registration;
    console.log("latestState: ", latestStateReg);
    if(latestStateReg.password!==latestStateReg.repeatPassword){
        return {message: "your passwords are different"}
    }
    return fetch('http://localhost:8081/signUp',{method: 'POST', body: JSON.stringify(latestStateReg),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json());
}
function* workerLoadSignInData() {
    console.log('workerLoadSignInData is working');
    const data = yield call(fetchSignInData);
    console.log("dataFromServer: ", data);
    if(data.message==="Unauthorized"){
        yield put(unauthenticated());
    } else{
        yield put(putDataFromServer(data));
        yield put(redirectToMainPage())
    }

}

export function* watchLoadSignInData() {
    console.log("Data should be loaded");
    yield takeEvery(LOAD_DATA_SIGN_IN, workerLoadSignInData)
}
function* workerLoadSignUpData() {
    console.log('workerLoadSignUpData is working');
    const data = yield call(fetchSignUpData);
    console.log("dataFromServer: ", data);
    if(data.status===200){
        const latestState = store.getState();
        yield put(loadDataToRequest(latestState.registration.login, latestState.registration.password));
    }else{
        alert(data.message);
        yield put(unauthenticated());
    }

}

export function* watchLoadSignUpData() {
    console.log("Data should be loaded");
    yield takeEvery(SEND_DATA_SIGN_UP, workerLoadSignUpData)
}
