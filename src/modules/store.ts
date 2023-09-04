// import createStore from './EventEmitter';
// import { createSagaMiddleware } from './EventEmitter';
import createSagaMiddleware from 'redux-saga';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from '@/modules/redux';
import rootReducer from './reducers';
import saga from './saga';

// const sagaMiddleware = createSagaMiddleware();

//@ts-ignore
// const store = createStore(reducer, { count: 0 }, sagaMiddleware);

// store.subscribe(() => {
// console.log(store.getState());
// });

// @ts-ignore
// sagaMiddleware.run(saga);

// store.dispatch({ type: 'INCREMENT' });

const createStoreApp = () => {
    const middleware = [];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    const composeEnhancers = compose;

    const persistConfig = {
        key: 'root',
        storage: storage,
        throttle: 100,
        version: 0,
        whitelist: ['auth', 'locale', 'sidebar', 'cookies'],
    };
    // Middleware: Redux Persist Persisted Reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // Redux: Store
    const store = createStore(persistedReducer, composeEnhancers(...enhancers));

    // kick off root saga
    sagaMiddleware.run(saga, store.dispatch);

    const persistor = persistStore(store);

    return { store, persistor };
};

export const { store, persistor } = createStoreApp();

export const useDispatch = () => {
    return store.dispatch;
};

export const useSelector = (selector: (state: any) => any) => {
    const state = store.getState();
    return { ...selector(state) };
};
