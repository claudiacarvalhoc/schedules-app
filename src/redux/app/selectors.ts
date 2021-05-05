import { Status } from "../appState";
import { RootState } from "../reducers";

/**
 * Get the app status after booting.
 * @param state
 */
export const bootStatus = (state: RootState): Status => state.app.status;