import { AppActions } from './actions';
// import {  } from "../types";
import { AppState } from '../appState';
import { appInitialState } from '../initialState';
// import _ from 'lodash';


export const appReducer = (
    state: AppState = appInitialState,
    action: AppActions
): AppState => {
    switch (action.type) {
        default:
            return {
                ...state,
            };
    }
};
