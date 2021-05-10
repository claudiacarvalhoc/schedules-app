import { HeaderTextStatus, ScheduleTextState, ScheduleState, ScheduleLogState, StatusState, ScheduleLogsTextState, LogTextState } from "../appState";
import { RootState } from "../reducers";
import _ from 'lodash';

/**
 * Get the Schedule Fetch Status
 * @param state
 */
export const getSchedulesStatus = (state: RootState): StatusState => state.app.status.schedules;

/**
 * Get the ScheduleLogs Fetch Status
 * @param state
 */
export const getScheduleLogsStatus = (state: RootState): StatusState => state.app.status.scheduleLogs;

 /**
  * Get the list of Schedules that must be visible on screen based on search criteria
  * @param state
  */
export const getSchedules = (state: RootState): ScheduleState[] => {
    const ids = state.app.visibleScheduleIds;
    const result = _.filter(state.app.schedules, (item) => {
        return ids.includes(item.id);
    });
    return result ?? [];
};

/**
 * Get the Selected Schedule Id
 * @param state
 */
export const getSelectedScheduleId = (state: RootState): number => state.app.selectedScheduleId;

/**
 * Get Schedule Logs
 */
export const getScheduleLogs = (state: RootState): ScheduleLogState[] => state.app.scheduleLogs;

/**
 * Return true if a search criteria is being aplied to the Schedules
 * @param state
 */
export const isSearchApplied = (state: RootState): boolean =>
    Array.isArray(state.app.visibleScheduleIds) &&
    Array.isArray(state.app.schedules) &&
    state.app.schedules.length > 0 &&
    state.app.visibleScheduleIds.length !== state.app.schedules.length;

 /**
  * Get Header Texts
  * @param state
  */
export const getHeaderTexts = (state: RootState): HeaderTextStatus => state.app.texts.header;

/**
 * Get Schedules Texts
 * @param state
 */
export const getScheduleText = (state: RootState): ScheduleTextState => state.app.texts.schedules;

/**
 * Get Schedule Logs Texts
 * @param state
 */
export const getScheduleLogsText = (state: RootState): ScheduleLogsTextState => state.app.texts.scheduleLogs;

/**
 * Get Log Texts
 * @param state
 */
export const getLogText = (state: RootState): LogTextState => state.app.texts.log;
