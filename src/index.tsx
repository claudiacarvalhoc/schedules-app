import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { configureStore } from './redux/store';
import { Provider } from 'react-redux';
import App from './components/app';
import { appInitialState } from './redux/initialState';

const store = configureStore(appInitialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
