import { AppActions } from './actions';
import { AppState, StatusState } from '../appState';
import { appInitialState } from '../initialState';
import { FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE, REQUEST_RETIRE_SCHEDULE, REQUEST_UNRETIRE_SCHEDULE, UPDATE_SELECTED_SCHEDULE } from '../types';
import _ from 'lodash';


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
                    schedules: StatusState.Success,
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
                    schedules: StatusState.Failure,
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
                    scheduleLogs: StatusState.Success,
                },
            };
        }
        case FETCH_SCHEDULE_LOGS_FAILURE: {
            return {
                ...state,
                scheduleLogs: [],
                status: {
                    ...state.status,
                    scheduleLogs: StatusState.Failure,
                },
            };
        }
        /**
         * User Actions
         */
        case REQUEST_RETIRE_SCHEDULE: {
            const schedules = _.cloneDeep(state.schedules);
            const index = schedules.findIndex(n => n.id === action.scheduleId);
            schedules[index].isRetired = true;
            return {
                ...state,
                schedules,
            };
        }
        case REQUEST_UNRETIRE_SCHEDULE: {
            const schedules = _.cloneDeep(state.schedules);
            const index = schedules.findIndex(n => n.id === action.scheduleId);
            schedules[index].isRetired = false;
            return {
                ...state,
                schedules,
            };
        }
        case UPDATE_SELECTED_SCHEDULE: {
            return {
                ...state,
                selectedScheduleId: action.scheduleId,
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
