import { DefaultRootState } from "react-redux";

export interface AppState extends DefaultRootState {
    isLoading: boolean;
}
