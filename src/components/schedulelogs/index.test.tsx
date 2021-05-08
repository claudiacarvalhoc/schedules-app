import Schedules from './index';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import { LogStatusState, ScheduleLogState, StatusState } from '../../redux/appState';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const scheduleLogItem: ScheduleLogState = {
    id: 1193520,
    startTime: new Date("2021-12-18T06:35:09.604Z"),
    endTime: new Date("2021-07-12T23:43:39.395Z"),
    status: LogStatusState.Running,
    serverName: "esse ad deserunt",
    scheduleId: 23802893,
};

const getMountWrapper = (scheduleLogsStatus: StatusState, scheduleLogsData: ScheduleLogState[] = []) => {
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
        scheduleLogs: scheduleLogsData,
        status: {
            ...appInitialState.status,
            scheduleLogs: scheduleLogsStatus
        },
      },
    });
    return mount(
        <Provider store={store}>
            <Schedules />
        </Provider>
    );
  };

describe('<ScheduleLogs />', () => {
    it('render correctly when component is loading', () => {
        const component = getMountWrapper(StatusState.Loading);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedule logs has an array data and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, [scheduleLogItem]);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedule logs is empty and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, []);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedule logs is undefined and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, []);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedule logs couldn\'t be fetched and data was saved as failure', () => {
        const component = getMountWrapper(StatusState.Failure);
        expect(toJson(component)).toMatchSnapshot();
    });
});
