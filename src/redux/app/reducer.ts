import { AppActions } from './actions';
import { AppState, StatusState } from '../appState';
import { appInitialState } from '../initialState';
import { FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE, REQUEST_RETIRE_SCHEDULE, REQUEST_UNRETIRE_SCHEDULE, UPDATE_SELECTED_SCHEDULE, RESET_SELECTED_SCHEDULE, LOADING_SCHEDULES_STATUS, LOADING_SCHEDULELOGS_STATUS, SEARCH_SCHEDULE } from '../types';
import _ from 'lodash';


export const appReducer = (
    state: AppState = appInitialState,
    action: AppActions
): AppState => {
    switch (action.type) {
        case LOADING_SCHEDULES_STATUS: {
            return {
                ...state,
                schedules: [],
                visibleScheduleIds: [],
                selectedScheduleId: undefined,
                status: {
                    ...state.status,
                    schedules: StatusState.Loading,
                },
            };
        }
        case LOADING_SCHEDULELOGS_STATUS: {
            return {
                ...state,
                scheduleLogs: [],
                selectedScheduleId: undefined,
                status: {
                    ...state.status,
                    scheduleLogs: StatusState.Loading,
                },
            };
        }
        /**
         * Fetch Schedule
         */
        case FETCH_SCHEDULE_SUCCESS: {
            return {
                ...state,
                schedules: action.schedules,
                visibleScheduleIds: action.schedules.map(n => n.id),
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
                visibleScheduleIds: [],
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
        case RESET_SELECTED_SCHEDULE: {
            return {
                ...state,
                selectedScheduleId: undefined,
            };
        }
        /**
         * Search Schedules
         */
        case SEARCH_SCHEDULE: {
            const result = state.schedules.filter(n => n.name.includes(action.criteria)).map(n => n.id);
            return {
                ...state,
                visibleScheduleIds: result,
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
