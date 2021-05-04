import { AppDispatch } from './store';

export const getSchedules = (): ((dispatch: AppDispatch) => Promise<void>) => {
    return dispatch => {
        // TODO : ....
        return Promise.resolve();
    };
};

export const getScheduleLogs = (): ((dispatch: AppDispatch) => Promise<void>) => {
    return dispatch => {
        // TODO : ....
        return Promise.resolve();
    };
};
