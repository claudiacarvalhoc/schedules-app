import { HeaderTextStatus, ScheduleTextState, ScheduleState, ScheduleLogState, StatusState, ScheduleLogsTextState, LogTextState } from "../appState";
import { RootState } from "../reducers";

/**
 * Get Fetch Status
 * @param state
 */
export const getSchedulesStatus = (state: RootState): StatusState => state.app.status.schedules;
export const getScheduleLogsStatus = (state: RootState): StatusState => state.app.status.scheduleLogs;

/**
 * Get Schedules , Selected Shedule Id
 */
export const getSchedules = (state: RootState): ScheduleState[] => state.app.schedules;
export const getSelectedScheduleId = (state: RootState): number => state.app.selectedScheduleId;

/**
 * Get ScheduleLogs , Selected Shedule Id
 */
export const getScheduleLogs = (state: RootState): ScheduleLogState[] => state.app.scheduleLogs;

/**
 * Get Texts
 */
export const getHeaderTexts = (state: RootState): HeaderTextStatus => state.app.texts.header;
export const getScheduleText = (state: RootState): ScheduleTextState => state.app.texts.schedules;
export const getScheduleLogsText = (state: RootState): ScheduleLogsTextState => state.app.texts.scheduleLogs;
export const getLogText = (state: RootState): LogTextState => state.app.texts.log;
