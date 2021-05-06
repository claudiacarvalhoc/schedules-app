import { DefaultRootState } from "react-redux";

/**
 * The App Status
 */
export interface AppState extends DefaultRootState {
    status: AppStatusSections;
    selectedScheduleId?: number;
    schedules: Schedule[];
    scheduleLogs: ScheduleLog[];
    texts: {
        header: HeaderText;
        schedules: ScheduleText;
    }
}

/**
 * The status to fetch data per section
 */
export interface AppStatusSections {
    schedules: Status;
    scheduleLogs: Status;
}

/**
 * The Boot Status is defined for options: Loading / Success / Failure.
 */
export enum Status {
    Loading,
    Success,
    Failure
}

/**
 * The Schedule interface.
 */
export interface Schedule {
    id: number;
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
    schedules?: IntervalType;
    timePeriod?: number;
}

/**
 * The Schedule Interval Types
 */
export enum IntervalType {
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
export interface ScheduleLog {
    id: number;
    startTime: Date;
    endTime: Date;
    status: LogStatus;
    serverName: string;
    scheduleId: number;
}

/**
 * The Schedule Logs Status
 */
export enum LogStatus {
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
export interface HeaderText {
    titleText: string;
}

/**
 * Texts used on Schedule
 * Note: This allow us to add localisation feature easily
 */
export interface ScheduleText {
    buttonRetireText: string;
    buttonUnretireText: string;
}
