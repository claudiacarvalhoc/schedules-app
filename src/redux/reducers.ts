import { Reducer, combineReducers } from 'redux';
import { AppState } from './appState';
import { appReducer } from './app/reducer';

export const rootReducer = combineReducers({
    app: appReducer as Reducer<AppState>,
});

export type RootState = ReturnType<typeof rootReducer>;
export type DefaultRootState = ReturnType<typeof rootReducer>;