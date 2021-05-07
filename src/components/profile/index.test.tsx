import React from 'react';
import Profile from './index';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const getShallowWrapper = ({ letter, color }) => {
    return shallow(
        <Profile letter={letter} color={color} />
    );
  };

describe('<Header />', () => {
    it('render correctly with color orange', () => {
        const props = {
            letter: 'T',
            color: 'orange'
        };
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('render correctly with color purple', () => {
        const props = {
            letter: 'T',
            color: 'purple'
        };
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
});
