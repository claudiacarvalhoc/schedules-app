import React from 'react';
import Enzyme, { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import LogItem, { LogItemProps } from './index';
import { LogStatusState } from '../../redux/appState';
import thunk from 'redux-thunk';
import { appInitialState } from '../../redux/initialState';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

const getMountWrapper = (props: LogItemProps) => {
    const store = configureMockStore([thunk])({
        app: {
        ...appInitialState,
        scheduleLogs: [props.item],
        },
    });
    return mount(
        <Provider store={store}>
            <LogItem {...props} />
        </Provider>);
}

describe('<LogItem />', () => {
    it('render correctly', () => {
        const props = {
            item: {
                id: 1193520,
                startTime: new Date("2021-12-18T06:35:09.604Z"),
                endTime: new Date("2021-07-12T23:43:39.395Z"),
                status: LogStatusState.Running,
                serverName: "esse ad deserunt",
                scheduleId: 23802893,
            },
            texts: {
                labelStartTime: 'Start',
                labelEndTime: 'End',
            },
        };
        const component = getMountWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
});
