import axios from 'axios';
import { Action } from 'redux';
import { config } from '../../config';
import { AppDispatch } from '../store';
import { avatarInitialState } from '../../redux/initialState';
import { FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE, REQUEST_RETIRE_SCHEDULE, REQUEST_UNRETIRE_SCHEDULE, UPDATE_SELECTED_SCHEDULE, RESET_SELECTED_SCHEDULE, LOADING_SCHEDULES_STATUS, LOADING_SCHEDULELOGS_STATUS, SEARCH_SCHEDULE } from "../types";

/**
 ** This type is used when the action setLoadingStatusForSchedules is dispatched.
 */
export interface SetLoadingStatusForSchedules extends Action<string> {
}

/**
 ** This action is dispatched when the schedules data is not fetched sucessfully and the user try to fetch it again.
 */
export const setLoadingStatusForSchedules = (): SetLoadingStatusForSchedules => ({
    type: LOADING_SCHEDULES_STATUS,
});

/**
 ** This type is used when the action setLoadingStatusForScheduleLogs is dispatched.
 */
export interface SetLoadingStatusForScheduleLogs extends Action<string> {
}

/**
 ** This action is dispatched when the schedule logs data is not fetched sucessfully and the user try to fetch it again.
 */
export const setLoadingStatusForScheduleLogs = (): SetLoadingStatusForScheduleLogs => ({
    type: LOADING_SCHEDULELOGS_STATUS,
});

/**
 ** This type is used when the action fetchScheduleSuccessfullyAction is dispatched.
 */
export interface FetchScheduleSuccessfullyAction extends Action<string> {
    schedules: any[]
}

/**
 ** This action is dispatched when the schedule is sucessfully fetched.
 */
export const fetchScheduleSuccessfullyAction = (schedules: any[]): FetchScheduleSuccessfullyAction => ({
    type: FETCH_SCHEDULE_SUCCESS,
    schedules,
});

/**
 ** This type is used when the action fetchScheduleLogsFailureAction is dispatched.
 */
export interface FetchScheduleFailureAction extends Action<string> { }


/**
 ** This action is dispatched when the schedule is sucessfully fetched.
 */
export const fetchScheduleLogsFailureAction = (): FetchScheduleLogsFailureAction => ({
    type: FETCH_SCHEDULE_FAILURE,
});

/**
 ** This type is used when the action fetchScheduleLogsSuccessfullyAction is dispatched.
 */
export interface FetchScheduleLogsSuccessfullyAction extends Action<string> {
    scheduleLogs: any[]
}

/**
 ** This action is dispatched when the schedule logs is sucessfully fetched.
 */
export const fetchScheduleLogsSuccessfullyAction = (scheduleLogs: any[]): FetchScheduleLogsSuccessfullyAction => ({
    type: FETCH_SCHEDULE_LOGS_SUCCESS,
    scheduleLogs,
});

/**
 ** This type is used when the action fetchScheduleLogsFailure is dispatched.
 */
export interface FetchScheduleLogsFailureAction extends Action<string> { }

/**
 * This action is dispatched when the schedule logs is not fetched sucessfully.
 */
export const fetchScheduleLogsFailure = (): FetchScheduleLogsFailureAction => ({
    type: FETCH_SCHEDULE_LOGS_FAILURE,
});

/**
 ** This type is used when a schedule should be retired.
 */
export interface RetireSchedule extends Action<string> {
    scheduleId: number
}

/**
 * This action is dispatched when the user wants to retire the schedule.
 */
export const retireSchedule = (scheduleId: number): RetireSchedule => ({
    type: REQUEST_RETIRE_SCHEDULE,
    scheduleId,
});

/**
 ** This type is used when a schedule should be unretired.
 */
export interface UnretireSchedule extends Action<string> {
    scheduleId: number
}

/**
 * This action is dispatched when the user wants to unretire the schedule.
 */
export const unretireSchedule = (scheduleId: number): UnretireSchedule => ({
    type: REQUEST_UNRETIRE_SCHEDULE,
    scheduleId,
});

/**
 ** This type is used to set the select schedule to the selected one
 */
export interface UpdateSelectedSchedule extends Action<string> {
    scheduleId: number
}

/**
 * This action is dispatched when the user select another schedule card
 */
export const updateSelectedSchedule = (scheduleId: number): UpdateSelectedSchedule => ({
    type: UPDATE_SELECTED_SCHEDULE,
    scheduleId,
});

/**
 ** This type is used to reset the select schedule
 */
export interface ResetSelectedSchedule extends Action<string> {
}

/**
 * This action is dispatched to reset the selected schedule
 */
export const resetSelectedSchedule = (): ResetSelectedSchedule => ({
    type: RESET_SELECTED_SCHEDULE,
});

/**
 ** This type is used to search the schedules
 */
export interface SearchSchedule extends Action<string> {
    criteria: string;
}

/**
 * This action is dispatched to search the schedules and show a subset of schedules
 */
export const searchSchedule = (criteria: string): SearchSchedule => ({
    type: SEARCH_SCHEDULE,
    criteria,
});

/**
 * This function fetch the schedules list.
 * If fetch is sucessfull, is dispatched a successfull action to fill the schedules on store
 * Otherwise, a fectch error must be set on store.
 */
export const getSchedulesAction = (): ((dispatch: AppDispatch) => Promise<void>) => {
    return dispatch => {
        dispatch(setLoadingStatusForSchedules());
        return axios.get(`${config.host}${config.path.schedules}`)
            .then(({ data }) => {
                if (Array.isArray(data)) {
                    data.forEach((element) => {
                        const index = Math.floor(Math.random() * avatarInitialState.length);
                        element.avatar = avatarInitialState[index];
                    });
                }
                dispatch(fetchScheduleSuccessfullyAction(data));
            })
            .catch((error) => {
                dispatch(fetchScheduleLogsFailureAction());
            });
    };
};

/**
 * This function fetch the schedule logs list.
 * If fetch is sucessfull, is dispatched a successfull action to fill the schedule logs on store
 * Otherwise, a fectch error must be set on store.
 */
export const getScheduleLogsAction = (): ((dispatch: AppDispatch) => Promise<void>) => {
    return dispatch => {
        dispatch(setLoadingStatusForScheduleLogs());
        return axios.get(`${config.host}${config.path.scheduleLogs}`)
            .then(({ data }) => {
                dispatch(fetchScheduleLogsSuccessfullyAction(data));
            })
            .catch((error) => {
                dispatch(fetchScheduleLogsFailure());
            });
    };
};

export type AppActions = FetchScheduleSuccessfullyAction & FetchScheduleLogsFailureAction & FetchScheduleLogsSuccessfullyAction & FetchScheduleLogsFailureAction & RetireSchedule & UnretireSchedule & UpdateSelectedSchedule & SearchSchedule;
