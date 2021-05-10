import React from 'react';
import Profile, { ProfileProps } from './index';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const getShallowWrapper = (props: ProfileProps) => {
    return shallow(
        <Profile {...props} />
    );
  };

describe('<Profile />', () => {
    it('render correctly with color orange', () => {
        const props: ProfileProps = {
            letter: 'T',
            color: 'orange'
        };
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('.orange').exists()).toBeTruthy();
    });
    it('render correctly with color purple', () => {
        const props: ProfileProps = {
            letter: 'T',
            color: 'purple'
        };
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
        expect(component.find('.purple').exists()).toBeTruthy();
    });
});
