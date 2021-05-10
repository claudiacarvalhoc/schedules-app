import Schedules from './index';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import { IntervalTypeState, ScheduleState, StatusState } from '../../redux/appState';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const scheduleId = 40469125;
const schedule: ScheduleState = {
    id: scheduleId,
    avatar: {
        letter: 'J',
        color: 'purple',
    },
    name: 'Random Schedule Name (0.6936307155251857)',
    description: 'mollit in ipsum laboris amet',
    isRetired: false,
    tasksCount: 6,
    startPoint:  new Date("2021-05-05"),
    endPoint: new Date("2021-05-05"),
    dayOfWeek: 6,
    dayOfMonth: 31,
    startDate: new Date("2021-05-05"),
    endDate: new Date("2021-05-05"),
    intervalType: IntervalTypeState.Week,
    timePeriod: 30,
};

const getMountWrapper = (
    schedulesStatus: StatusState,
    schedulesData: ScheduleState[],
    visibleScheduleIds: number[] = undefined,
) => {
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
        schedules: schedulesData ?? appInitialState.schedules,
        visibleScheduleIds: visibleScheduleIds ?? [scheduleId],
        status: {
            ...appInitialState.status,
            schedules:schedulesStatus
        },
      },
    });
    return mount(
        <Provider store={store}>
            <Schedules />
        </Provider>
    );
};

describe('<Schedules />', () => {
    it('render correctly when schedules couldn\'t be fetched and data was saved as failure', () => {
        const component = getMountWrapper(StatusState.Failure, []);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedules_failed"]').exists()).toBeTruthy();
    });
    it('render correctly when schedules has an array data and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, [schedule]);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedules_loaded_with_data"]').exists()).toBeTruthy();
    });
    it('render correctly when schedules are not empty, data was saved sucessfully, but search criteria is not found', () => {
        const component = getMountWrapper(StatusState.Success, [schedule], []);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedules_loaded_search_result"]').exists()).toBeTruthy();
    });
    it('render correctly when schedules is undefined and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, [], []);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('[data-test="schedules_loaded_without_data"]').exists()).toBeTruthy();
    });
});
