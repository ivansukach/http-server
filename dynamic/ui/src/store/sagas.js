import {takeEvery} from 'redux-saga/effects';
import {LOAD_DATA_SIGN_IN} from "./auth/actions";
import {SEND_DATA_SIGN_UP} from "./registration/actions";
import {store} from "../App"

function* workerLoadSignInData() {
    console.log('workerLoadSignInData is working');
    let latestStateAuth = store.getState().auth;
    latestStateAuth.type = "auth";
    console.log("latestStateAuth: ", latestStateAuth);
    const ws = latestStateAuth.ws;
    const json = JSON.stringify(latestStateAuth);
    console.log("Отправка данных формы входа");
    console.log("Form data: ", json);
    ws.send(json);

}

export function* watchLoadSignInData() {
    console.log("Data should be loaded");
    yield takeEvery(LOAD_DATA_SIGN_IN, workerLoadSignInData)
}

function* workerLoadSignUpData() {
    console.log('workerLoadSignUpData is working');
    let latestStateReg = store.getState().registration;
    latestStateReg.type = "registration";
    console.log("latestStateReg: ", latestStateReg);
    const ws = latestStateReg.ws;
    const json = JSON.stringify(latestStateReg);
    console.log("Отправка данных формы регистрации");
    console.log("Form data: ", json);
    ws.send(json);
    // console.log("dataFromServer: ", data);
    // if (data.status === 200) {
    //     const latestState = store.getState();
    //     yield put(loadDataToRequest(latestState.registration.login, latestState.registration.password));
    // } else {
    //     alert(data.message);
    //     yield put(unauthenticated());
    // }

}

export function* watchLoadSignUpData() {
    console.log("Data should be loaded");
    yield takeEvery(SEND_DATA_SIGN_UP, workerLoadSignUpData)
}
