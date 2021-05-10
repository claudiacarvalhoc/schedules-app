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

const scheduleId = 23802893;
const schedule = {
    id: scheduleId,
    name: "Random Schedule Name (0.7243723999446063)",
    description: "Duis ipsum incididunt esse cillum",
    isRetired: false,
    tasksCount: 1,
    startPoint: new Date("2021-01-04T03:07:07.445Z"),
    endPoint: new Date("2021-05-12T18:57:10.260Z"),
    dayOfWeek: 4,
    dayOfMonth: 13,
    startDate: new Date("2021-06-29T05:10:55.377Z"),
    endDate: new Date("2021-11-04T20:33:52.142Z"),
};
const scheduleLogItem: ScheduleLogState = {
    id: 1193520,
    startTime: new Date("2021-12-18T06:35:09.604Z"),
    endTime: new Date("2021-07-12T23:43:39.395Z"),
    status: LogStatusState.Running,
    serverName: "esse ad deserunt",
    scheduleId: scheduleId,
};

const getMountWrapper = (
    scheduleLogsStatus: StatusState,
    scheduleLogsData: ScheduleLogState[],
    unsetSelectScheduleId: boolean = false,
) => {
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
        visibleScheduleIds: [scheduleId],
        selectedScheduleId: unsetSelectScheduleId ? undefined : scheduleId,
        schedules: [schedule],
        scheduleLogs: scheduleLogsData,
        status: {
            schedules: StatusState.Success,
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
    it('render correctly schedule is not selected logs has an array data and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, [scheduleLogItem], true);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedulelogs_no_selected_schedule"]').exists()).toBeTruthy();
    });
    it('render correctly when schedule logs has an array data and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, [scheduleLogItem]);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedulelogs_load_items"]').exists()).toBeTruthy();
    });
    it('render correctly when schedule logs is empty and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, []);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedulelogs_load_empty_items"]').exists()).toBeTruthy();
    });
    it('render correctly when schedule logs is undefined and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, []);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedulelogs_load_empty_items"]').exists()).toBeTruthy();
    });
    it('render correctly when schedule logs couldn\'t be fetched and data was saved as failure', () => {
        const component = getMountWrapper(StatusState.Failure, []);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedulelogs_load_failure_message"]').exists()).toBeTruthy();
    });
});
