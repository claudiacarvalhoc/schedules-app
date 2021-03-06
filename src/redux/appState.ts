import { DefaultRootState } from "react-redux";

/**
 * The App Status
 */
export interface AppState extends DefaultRootState {
    status: AppStatusSectionsState;
    selectedScheduleId?: number;
    schedules: ScheduleState[];
    visibleScheduleIds: number[];
    scheduleLogs: ScheduleLogState[];
    texts: {
        header: HeaderTextStatus;
        schedules: ScheduleTextState;
        scheduleLogs: ScheduleLogsTextState;
        log: LogTextState;
    }
}

/**
 * The status to fetch data per section
 */
export interface AppStatusSectionsState {
    schedules: StatusState;
    scheduleLogs: StatusState;
}

/**
 * The Boot Status is defined for options: Loading / Success / Failure.
 */
export enum StatusState {
    Loading,
    Success,
    Failure
}

/**
 * The Schedule interface.
 */
export interface ScheduleState {
    id: number;
    avatar: AvatarState;
    name: string;
    description: string;
    isRetired: boolean;
    tasksCount: number;
    startPoint: Date;
    endPoint: Date;
    dayOfWeek: number;
    dayOfMonth: number;
    startDate: Date;
    endDate: Date;
    intervalType?: IntervalTypeState;
    timePeriod?: number;
}

/**
 * The Avatar Identification
 */
export interface AvatarState {
    letter: string;
    color: string;
}

/**
 * The Schedule Interval Types
 */
export enum IntervalTypeState {
    Once,
    Year,
    Week,
    Hour,
    Minute,
    Second
}

/**
 * The Schedule Logs interface.
 */
export interface ScheduleLogState {
    id: number;
    startTime: Date;
    endTime: Date;
    status: LogStatusState;
    serverName: string;
    scheduleId: number;
}

/**
 * The Schedule Logs Status
 */
export enum LogStatusState {
    Terminated,
    Pending,
    Completed,
    Exception,
    Running
}

/**
 * Texts used on Header
 * Note: This allow us to add localisation feature easily
 */
export interface HeaderTextStatus {
    titleText: string;
}

/**
 * Texts used on Schedule
 * Note: This allow us to add localisation feature easily
 */
export interface ScheduleTextState {
    buttonRetireText: string;
    buttonUnretireText: string;
    errorMessageText: string;
    buttonRetryText: string;
    emptyMessageText: string;
    emptySearchResultText: string;
}

/**
 * Texts used on Schedule Logs
 */
export interface ScheduleLogsTextState {
    errorMessageText: string;
    buttonRetryText: string;
    emptyMessageText: string;
    noSelectedScheduleText: string;
}

/**
 * Texts used on Log Item
 */
export interface LogTextState {
    labelStartTime: string;
    labelEndTime: string;
}
