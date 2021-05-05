import { DefaultRootState } from "react-redux";

export interface AppState extends DefaultRootState {
    status: Status;
}

/**
 * The Boot Status is defined for options: Loading / Success / Failure.
 */
export enum Status {
    Loading,
    Success,
    Failure
}