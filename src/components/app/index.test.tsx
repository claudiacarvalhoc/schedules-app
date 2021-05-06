import React from 'react';
import App from './index';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const getMountWrapper = () => {
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
      }
    });
    return mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
  };

describe('<Header />', () => {
    it('render correctly', () => {
        const component = getMountWrapper();
        expect(toJson(component)).toMatchSnapshot();
    });
});
