import { AppState, AvatarState, StatusState } from "./appState";

/**
 * This is the initial state of redux.
 */
export const appInitialState: AppState = {
    status: {
        schedules: StatusState.Loading,
        scheduleLogs: StatusState.Loading,
    },
    selectedScheduleId: undefined,
    schedules: [],
    visibleScheduleIds: [],
    scheduleLogs: [],
    texts: {
        header: {
            titleText: 'Schedules',
        },
        schedules: {
            buttonRetireText: 'Retire',
            buttonUnretireText: 'Unretire',
            errorMessageText: 'Something went wrong ...',
            buttonRetryText: 'Retry',
            emptyMessageText: 'No schedules available.',
        },
        scheduleLogs: {
          errorMessageText: 'Something went wrong ...',
          buttonRetryText: 'Retry',
          emptyMessageText: 'No schedules logs available.',
          noSelectedScheduleText: 'Please select a schedule.',
        },
        log: {
          labelStartTime: 'Start',
          labelEndTime: 'End',
        },
    }
};

export const avatarInitialState: AvatarState[] = [
    {
      letter: 'N',
      color: 'orange',
    },
    {
      letter: 'A',
      color: 'purple',
    },
    {
      letter: 'T',
      color: 'orange',
    },
    {
      letter: 'J',
      color: 'purple',
    }
];