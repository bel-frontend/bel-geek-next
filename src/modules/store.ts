import rootReducer from './reducers';
import { applyMiddleware, compose } from '@/modules/redux';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
interface EventEmitter {
    on: (event: string, listener: Function) => void;
    emit: (event: string, payload: any) => void;
}

const createEventEmitter = (): EventEmitter => {
    let listeners: { [key: string]: Function[] } = {};

    const on = (event: string, listener: Function): void => {
        listeners[event] = (listeners[event] || []).concat(listener);
    };

    const emit = (event: string, payload: any): void => {
        (listeners[event] || []).forEach((listener) => listener(payload));
    };

    return {
        on,
        emit,
    };
};

interface Action {
    type: string;
    [key: string]: any;
}

interface Store<S, A> {
    getState: () => S;
    dispatch: (action: A) => void;
    on: (event: string, listener: Function) => void;
}
const composeEnhancers = compose;

const createStore = <S, A extends Action, T>(
    reducer: (state: S, action: A) => S,
    initialState: S,
    enhancer?: T,
): Store<S, A> => {
    const middleware = [];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    const composeEnhancers = compose;

    let state = initialState;
    const events = createEventEmitter();
    const getState = (): S => state;

    const dispatch = (action: A): void => {
        state = reducer(state, action);
        console.log('state', state);

        events.emit('stateChanged', state);
    };

    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, initialState);
    }

    return {
        getState,
        dispatch,
        on: events.on,
    };
};

export const store = createStore(
    rootReducer,
    //@ts-ignore
    {},

    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga, store.dispatch);

export const useDispatch = () => {
    return store.dispatch;
};

export const useSelector = (selector: any) => {
    return selector(store.getState());
};
