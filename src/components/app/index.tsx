import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './app.module.css';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';
import { getSchedulesAction, getScheduleLogsAction } from '../../redux/app/actions';
import Schedules from '../schedules';
import ScheduleLogs from '../schedulelogs';
import Header from '../header';

export interface AppStateProps { }

export interface AppDispatchProps {
  bootApp: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps;

const App: FC<AppProps> = ({ bootApp }) => {
  /**
   * Fetch schedules data when the component did mount
   **/
  useEffect(() => {
    bootApp();
  }, [bootApp]);

  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.content}>
        <Schedules />
        <ScheduleLogs />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): AppStateProps => ({
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
