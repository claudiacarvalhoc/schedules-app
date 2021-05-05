import { AppActions } from './actions';
// import {  } from "../types";
import { AppState, Status } from '../appState';
import { appInitialState } from '../initialState';
import { APP_BOOT_FAILURE, APP_BOOT_SUCCESS } from '../types';
// import _ from 'lodash';


export const appReducer = (
    state: AppState = appInitialState,
    action: AppActions
): AppState => {
    switch (action.type) {
        case APP_BOOT_SUCCESS:
            return {
                ...state,
                status: Status.Success
            };
        case APP_BOOT_FAILURE:
            return {
                ...state,
                status: Status.Failure
            };
        default:
            return {
                ...state,
            };
    }
};
