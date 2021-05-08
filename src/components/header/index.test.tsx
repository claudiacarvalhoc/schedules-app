import React from 'react';
import Header from './index';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import { HeaderTextState } from '../../redux/appState';

Enzyme.configure({ adapter: new Adapter() });

const getMountWrapper = (headerText: HeaderTextState) => {
    const store = configureMockStore()({
      app: {
        ...appInitialState,
        texts: {
            ...appInitialState.texts,
            header: headerText
        }
      }
    });
    return mount(
        <Provider store={store}>
            <Header />
        </Provider>
    );
  };

describe('<Header />', () => {
    it('render correctly', () => {
        const props: HeaderTextState = {
            titleText: 'Schedule',
        };
        const component = getMountWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
});
