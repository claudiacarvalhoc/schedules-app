import { HeaderText, ScheduleText, Schedule, ScheduleLog, Status } from "../appState";
import { RootState } from "../reducers";

/**
 * Get Fetch Status
 * @param state
 */
export const getSchedulesStatus = (state: RootState): Status => state.app.status.schedules;
export const getScheduleLogsStatus = (state: RootState): Status => state.app.status.scheduleLogs;

/**
 * Get Schedules , Selected Shedule Id
 */
export const getSchedules = (state: RootState): Schedule[] => state.app.schedules;
export const getSelectedScheduleId = (state: RootState): number => state.app.selectedScheduleId;

/**
 * Get ScheduleLogs , Selected Shedule Id
 */
export const getScheduleLogs = (state: RootState): ScheduleLog[] => state.app.scheduleLogs;

/**
 * Texts
 */

export const getHeaderTexts = (state: RootState): HeaderText => state.app.texts.header;
export const getScheduleText = (state: RootState): ScheduleText => state.app.texts.schedules;
