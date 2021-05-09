import React from 'react';
import App from './index';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import thunk from 'redux-thunk';
import { StatusState } from '../../redux/appState';

Enzyme.configure({ adapter: new Adapter() });

const getMountWrapper = (status: StatusState = undefined) => {
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
        status: {
          ...appInitialState.status,
          schedules: status ?? appInitialState.status.schedules,
          scheduleLogs: status ?? appInitialState.status.scheduleLogs,
        },
      }
    });
    return mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
  };

describe('<Header />', () => {
    it('render correctly when data is being fetched', () => {
        const component = getMountWrapper();
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when data is fetched', () => {
      const component = getMountWrapper();
      expect(toJson(component)).toMatchSnapshot();
  });
});
