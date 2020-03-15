import { takeEvery, put, call } from 'redux-saga/effects';
import {LOAD_DATA, putData} from "./auth/actions";
function fetchData() {
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json());
}

function* workerLoadData() {
    console.log('it is working');
    const data = yield call(fetchData);
    yield put(putData(data));
}

export function* watchLoadData() {
    yield takeEvery(LOAD_DATA, workerLoadData)
}