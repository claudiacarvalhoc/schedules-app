import { AppActions } from './actions';
// import {  } from "../types";
import { AppState, Status } from '../appState';
import { appInitialState } from '../initialState';
import { FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE } from '../types';
// import _ from 'lodash';


export const appReducer = (
    state: AppState = appInitialState,
    action: AppActions
): AppState => {
    switch (action.type) {
        /**
         * Fetch Schedule
         */
        case FETCH_SCHEDULE_SUCCESS: {
            const hasItems = Array.isArray(action.schedules) && action.schedules.length > 0;
            return {
                ...state,
                schedules: action.schedules,
                selectedScheduleId: hasItems ? action.schedules[0].id : undefined,
                status: {
                    ...state.status,
                    schedules: Status.Success,
                },
            };
        }
        case FETCH_SCHEDULE_FAILURE: {
            return {
                ...state,
                schedules: [],
                selectedScheduleId: undefined,
                status: {
                    ...state.status,
                    schedules: Status.Failure,
                },
            };
        }
        /**
         * Fetch Schedule Logs
         */
        case FETCH_SCHEDULE_LOGS_SUCCESS: {
            return {
                ...state,
                scheduleLogs: action.scheduleLogs,
                status: {
                    ...state.status,
                    scheduleLogs: Status.Success,
                },
            };
        }
        case FETCH_SCHEDULE_LOGS_FAILURE: {
            return {
                ...state,
                scheduleLogs: [],
                status: {
                    ...state.status,
                    scheduleLogs: Status.Failure,
                },
            };
        }
        /**
         * Default behaviour
         */
        default:
            return {
                ...state,
            };
    }
};
