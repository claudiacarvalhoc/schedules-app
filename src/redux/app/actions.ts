import { Action } from 'redux';
import { APP_BOOT_SUCCESS, APP_BOOT_FAILURE, FETCH_SCHEDULE_LOGS_SUCCESS, FETCH_SCHEDULE_LOGS_FAILURE  } from "../types";

export interface AppBootSuccessfullyAction extends Action<string> {
    schedules: any[]
}

export const appBootSuccessfullyAction = (schedules: any[]): AppBootSuccessfullyAction => ({
    type: APP_BOOT_SUCCESS,
    schedules,
});

export interface AppBootFailureAction extends Action<string> { }

export const appBootFailureAction = (): AppBootFailureAction => ({
    type: APP_BOOT_FAILURE,
});


export interface FetchScheduleLogsSuccessfullyAction extends Action<string> {
    scheduleLogs: any[]
}
export const fetchScheduleLogsSuccessfullyAction = (scheduleLogs: any[]): FetchScheduleLogsSuccessfullyAction => ({
    type: FETCH_SCHEDULE_LOGS_SUCCESS,
    scheduleLogs,
});

export interface FetchScheduleLogsFailureAction extends Action<string> { }

export const fetchScheduleLogsFailure = (): FetchScheduleLogsFailureAction => ({
    type: FETCH_SCHEDULE_LOGS_FAILURE,
});


export type AppActions = AppBootSuccessfullyAction & AppBootFailureAction & FetchScheduleLogsSuccessfullyAction & FetchScheduleLogsFailureAction;