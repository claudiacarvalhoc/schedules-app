import axios from 'axios';
import { Action } from 'redux';
import { config } from '../../config';
import { AppDispatch } from '../store';
import { APP_BOOT_SUCCESS, APP_BOOT_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE  } from "../types";

/**
 ** This type is used when the action appBootSuccessfullyAction is dispatched.
 */
export interface AppBootSuccessfullyAction extends Action<string> {
    schedules: any[]
}

/**
 ** This action is dispatched when the schedule is sucessfully fetched.
 */
export const appBootSuccessfullyAction = (schedules: any[]): AppBootSuccessfullyAction => ({
    type: APP_BOOT_SUCCESS,
    schedules,
});

/**
 ** This type is used when the action appBootFailureAction is dispatched.
 */
export interface AppBootFailureAction extends Action<string> { }


/**
 ** This action is dispatched when the schedule is sucessfully fetched.
 */
export const appBootFailureAction = (): AppBootFailureAction => ({
    type: APP_BOOT_FAILURE,
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
 * This function fetch the schedules list.
 * If fetch is sucessfull, is dispatched a successfull action to fill the schedules on store
 * Otherwise, a fectch error must be set on store.
 */
export const getSchedulesAction = (): ((dispatch: AppDispatch) => Promise<void>) => {
    return dispatch => {
        const path = `${config.host}${config.path.schedules}`;
        console.log('request -', path);
        return axios.get(`${config.host}${config.path.schedules}`)
            .then(({ data }) => {
                dispatch(appBootSuccessfullyAction(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(appBootFailureAction());
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
        return axios.get(`${config.host}${config.path.scheduleLogs}`)
            .then(({ data }) => {
                dispatch(fetchScheduleLogsSuccessfullyAction(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(fetchScheduleLogsFailure());
            });
    };
};

export type AppActions = AppBootSuccessfullyAction & AppBootFailureAction & FetchScheduleLogsSuccessfullyAction & FetchScheduleLogsFailureAction;