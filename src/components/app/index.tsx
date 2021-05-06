import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './app.module.css';
import { RootState } from '../../redux/reducers';
import { getSchedulesStatus, getScheduleLogsStatus } from '../../redux/app/selectors';
import { AppDispatch } from '../../redux/store';
import { getSchedulesAction, getScheduleLogsAction } from '../../redux/app/actions';
import { Status } from '../../redux/appState';
import Schedules from '../schedules';
import ScheduleLogs from '../schedulelogs';
// import cn from 'classnames';

export interface AppStateProps {
}

export interface AppDispatchProps {
  bootApp: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps;

  /**
   *
   * display: flex;
   * justify-content: center;
   * align-items: center;
  */

const App: FC<AppProps> = ({ bootApp }) => {
  /**
   * Fetch schedules data when the component did mount
   **/
  useEffect(() => {
    bootApp();
  }, [bootApp]);

  return (
    <>
    <Schedules />
    <ScheduleLogs />
    </>
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