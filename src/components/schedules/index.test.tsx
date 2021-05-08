import Schedules from './index';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import { ScheduleState, StatusState } from '../../redux/appState';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const getMountWrapper = (schedulesStatus: StatusState, schedulesData: ScheduleState[] = undefined) => {
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
        schedules: schedulesData ?? appInitialState.schedules,
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
    it('render correctly when component is loading', () => {
        const component = getMountWrapper(StatusState.Loading);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedules has an array data and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedules is empty and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, []);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedules is undefined and data was saved sucessfully', () => {
        const component = getMountWrapper(StatusState.Success, []);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly when schedules couldn\'t be fetched and data was saved as failure', () => {
        const component = getMountWrapper(StatusState.Failure);
        expect(toJson(component)).toMatchSnapshot();
    });
});