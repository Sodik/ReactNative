import {applyMiddleware, createStore} from 'redux';
import appReducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

function* fetchData() {
  try {
    const res = yield call(fetch, 'https://api.stackexchange.com/2.2/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&tagged=react-native&filter=default');
    const data = yield call([res, res.json]);
    yield put({ type: 'FETCH_SUCCEEDED', payload: data.items });
  } catch (e) {
    yield put({type: 'FETCH_FAILED', error})
  }
}

function* fetchDataSaga() {
  yield takeEvery('FETCH_REQUESTED', fetchData);
}

const store = createStore(
  appReducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(fetchDataSaga);

export default store;