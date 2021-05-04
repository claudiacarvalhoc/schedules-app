import React, { FC } from 'react';
import { connect } from 'react-redux';
// import styles from './app.module.css';
import { RootState } from '../../redux/reducers';
import { isLoading } from '../../redux/app/selectors';
// import cn from 'classnames';

export interface AppProps {
  isLoading: boolean;
}


const App: FC<AppProps> = ({ isLoading = [] }) => {
  return (
    <>
      {isLoading && (<p>Is Loading</p>)}
      {!isLoading && (<p>Data was fetched</p>)}
    </>
  );
};

const mapStateToProps = (state: RootState): AppProps => ({
  isLoading: isLoading(state)
});

export default connect<AppProps>(
  mapStateToProps,
)(App);