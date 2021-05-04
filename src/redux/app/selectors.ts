import { RootState } from "../reducers";

export const isLoading = (state: RootState): boolean => state.app.isLoading;