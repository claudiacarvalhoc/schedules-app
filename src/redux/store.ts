import { AnyAction } from 'redux';
import { AppState } from './appState';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

export type AppThunk<R> = ThunkAction<R, AppState, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>;


export const configureStore = (initialState: AppState) => {
    const logger = createLogger();
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [thunk, logger];

    const store = createStore(
        rootReducer,
        {
            app: initialState,
        },
        composeEnhancers(applyMiddleware(...middleware)),
    );

    return store;
};

export default configureStore;
