import { takeEvery, put, call } from 'redux-saga/effects';
import {LOAD_DATA, putData, unauthenticated} from "./auth/actions";
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
function* workerLoadData() {
    console.log('it is working');
    const data = yield call(fetchSignInData);
    console.log("dataFromServer: ", data);
    if(data.message==="Unauthorized"){
        yield put(unauthenticated());
    }else{
        yield put(putData(data));
    }

}

export function* watchLoadData() {
    console.log("Data should be loaded");
    yield takeEvery(LOAD_DATA, workerLoadData)
}

function* workerLoadSlideShow() {
    console.log('slide show should be started soon');
    let index = 0;
    for( ;store.getState.main.status; ){
        setTimeout(yield put(changeSlide(++index)), 4000);
    }



}

export function* watchLoadSlideShow() {
    console.log("Slide show should be loaded");
    yield takeEvery(LOAD_SLIDE_SHOW, workerLoadSlideShow)
}