import axios from 'axios';
import { Action } from 'redux';
import { config } from '../../config';
import { AppDispatch } from '../store';
import { FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE  } from "../types";

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
                dispatch(fetchScheduleSuccessfullyAction(data));
            })
            .catch((error) => {
                console.error(error);
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

export type AppActions = FetchScheduleSuccessfullyAction & FetchScheduleLogsFailureAction & FetchScheduleLogsSuccessfullyAction & FetchScheduleLogsFailureAction;
