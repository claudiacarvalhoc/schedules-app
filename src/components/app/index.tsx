import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
// import styles from './app.module.css';
import { RootState } from '../../redux/reducers';
import { bootStatus } from '../../redux/app/selectors';
import { AppDispatch } from '../../redux/store';
import { getSchedulesAction } from '../../redux/app/actions';
import { Status } from '../../redux/appState';
import ReactLoading from 'react-loading';
// import cn from 'classnames';

export interface AppStateProps {
  bootStatus: Status;
}

export interface AppDispatchProps {
  bootApp: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps;

const App: FC<AppProps> = ({ bootStatus, bootApp }) => {
  /**
   * Fetch schedules data when the component did mount
   **/
  useEffect(() => {
    bootApp();
  }, [bootApp]);

  const isLoading = bootStatus === Status.Loading;
  const success = bootStatus === Status.Success;
  const failure = bootStatus === Status.Failure;
  return (
    <>
      {isLoading && (<ReactLoading type='spin' color='#000000' height={50} width={50} />)}
      {success && (<p>Data was fetched :)</p>)}
      {failure && (<p>Data cannot be fetched :(</p>)}
    </>
  );
};

const mapStateToProps = (state: RootState): AppStateProps => ({
  bootStatus: bootStatus(state),
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): AppDispatchProps => ({
  bootApp: () => dispatch(getSchedulesAction()),
});

export default connect<AppStateProps, AppDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);