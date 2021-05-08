import React from 'react';
import Time from './index';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TimeProps } from './index';

const props: TimeProps = {
    label: 'Start',
    time: 'April 28 2021',
};

const getShallowWrapper = (props: TimeProps) => {
    return shallow(
        <Time {...props} />
    );
};

describe('<Time />', () => {
    it('render correctly', () => {
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
});
