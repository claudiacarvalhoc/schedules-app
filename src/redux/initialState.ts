import { AppState, AvatarState, Status } from "./appState";

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
        }
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