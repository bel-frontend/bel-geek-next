import get from 'lodash/get';
import { createAction } from 'redux-actions';
import { all, put, select, call, takeLatest, delay } from 'redux-saga/effects';
import { store } from '@/modules/store';
import * as api_helpers from 'react_redux_api';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const modules = 'init';

export const INIT_DATA = `${modules}/INIT_DATA`;
export const RE_INIT_DATA = `${modules}/RE_INIT_DATA`;

export const initDataAction = createAction(INIT_DATA);
export const reInitDataAction = createAction(RE_INIT_DATA);

const initDataSaga = function* (action: any, dipatch: any) {
    console.log('initDataSaga');

    yield delay(1000);
    yield put(initDataAction());
};

export const isRehydrated = (state: any) => state._persist.rehydrated;

export const initModuleSaga = function* (dispatch: any) {
    yield all([
        // @ts-ignore
        takeLatest([store?.initAcion], initDataSaga, dispatch),

        // takeLatest([INIT_DATA], getWorkingTimeSaga, dispatch),
        // takeLatest([SAVE_CREDENTIALS], redirectToInitSaga, dispatch),
    ]);
};
//selectors