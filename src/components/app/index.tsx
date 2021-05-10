import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './app.module.css';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';
import { getSchedulesAction, getScheduleLogsAction } from '../../redux/app/actions';
import { getSchedulesStatus, getScheduleLogsStatus } from '../../redux/app/selectors';
import Schedules from '../schedules';
import ScheduleLogs from '../schedulelogs';
import Header from '../header';
import ReactLoading from 'react-loading';
import { StatusState } from '../../redux/appState';

export interface AppStateProps {
  isLoading: boolean;
}

export interface AppDispatchProps {
  bootApp: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps;

const App: FC<AppProps> = ({
  isLoading,
  bootApp,
}) => {
  /**
   * Fetch schedules data when the component did mount
   **/
  useEffect(() => {
    bootApp();
  }, [bootApp]);

  return (
    <div className={styles.container}>

      <Header/>
      {isLoading && (
        <div
          className={styles.loading}
          data-test="app_show_loading"
        >
          <ReactLoading type='spin' color='#000000' height={50} width={50} />
        </div>)}
      {!isLoading && (
      <div
        className={styles.content}
        data-test="app_load_schedules"
        >
        <Schedules />
        <ScheduleLogs />
      </div>)}
    </div>
  );
};

const mapStateToProps = (state: RootState): AppStateProps => ({
  isLoading: getSchedulesStatus(state) === StatusState.Loading || getScheduleLogsStatus(state) === StatusState.Loading,
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): AppDispatchProps => ({
  bootApp: () => {
    dispatch(getSchedulesAction());
    dispatch(getScheduleLogsAction());
  },
});

export default connect<AppStateProps, AppDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
