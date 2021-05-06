import { AppState, Status } from "./appState";

/**
 * This is the initial state of redux.
 */
export const appInitialState: AppState = {
    status: {
        schedules: Status.Loading,
        scheduleLogs: Status.Loading,
    },
    selectedScheduleId: undefined,
    schedules: [],
    scheduleLogs: [],
};
