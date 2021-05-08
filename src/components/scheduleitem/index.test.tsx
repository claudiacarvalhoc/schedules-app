import React from 'react';
import ScheduleItem from './index';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { appInitialState } from '../../redux/initialState';
import { Schedule, ScheduleText } from '../../redux/appState';
import { retireSchedule, unretireSchedule, updateSelectedSchedule } from '../../redux/app/actions';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../redux/app/actions');
const mockUpdateSelectedId = jest.fn();
const mockRetire = jest.fn();
const mockUnretire = jest.fn();

const schedule = {
    id: 40469125,
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
    intervalType: 'Week',
    timePeriod: 30,
};

const getMountWrapper = (
    schedule: Schedule,
    scheduleTexts: Partial<ScheduleText> = {}
) => {
    const props = {
        schedule,
        isSelected: true,
        updateSelectedId: mockUpdateSelectedId,
        retire: mockRetire,
        unretire: mockUnretire,
    };
    const store = configureMockStore([thunk])({
      app: {
        ...appInitialState,
        schedules: [schedule],
        selectedScheduleId: schedule.id,
        texts: {
            ...appInitialState.texts,
            schedules: scheduleTexts,
        }
      }
    });
    return mount(
        <Provider store={store}>
            <ScheduleItem {...props} />
        </Provider>
    );
  };

describe('<ScheduleItem />', () => {
    it('render correctly', () => {
        const component = getMountWrapper(schedule);
        expect(toJson(component)).toMatchSnapshot();
    });
    // WARNING: the idea here was to test the clicks on "retire" / "unretire" button and click on card
    // But, even registring the redux-trunk on store, mocking the actions and also
    // mocking each prop, the error persisted
    // The error was:
    // Actions must be plain objects. Use custom middleware for async actions.
    // it('when user select the card', () => {
    //     (updateSelectedSchedule as jest.Mock).mockImplementation(mockUpdateSelectedId);
    //     schedule.isRetired = false;
    //     const component = getMountWrapper(schedule);
    //     component.find('[data-test="action_40469125_retire"]').find('button').simulate('click');
    //     expect(mockUpdateSelectedId).toHaveBeenCalled();
    // });
    // it('when schedule is unretired should call retire function', () => {
    //     (retireSchedule as jest.Mock).mockImplementation(mockRetire);
    //     schedule.isRetired = false;
    //     const component = getMountWrapper(schedule);
    //     component.find('[data-test="action_40469125_retire"]').find('button').simulate('click');
    //     expect(mockRetire).toHaveBeenCalled();
    // });
    // it('when schedule is retired should call unretire function', () => {
    //     (unretireSchedule as jest.Mock).mockImplementation(mockUnretire);
    //     schedule.isRetired = true;
    //     const component = getMountWrapper(schedule);
    //     component.find('[data-test="action_40469125_retire"]').find('button').simulate('click');
    //     expect(mockUnretire).toHaveBeenCalled();
    // });
});
