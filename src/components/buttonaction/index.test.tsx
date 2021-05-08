import React from 'react';
import ButtonAction, { ButtonActionProps } from './index';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const getShallowWrapper = (props: ButtonActionProps) => {
    return shallow(
        <ButtonAction {...props} />
    );
};

const mockOnRetire = jest.fn();
const props: ButtonActionProps = {
    text: 'Retire',
    size: 'small',
    variant: 'outlined',
    type: 'primary',
    onClick: mockOnRetire,
};

describe('<Header />', () => {
    it('render correctly', () => {
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('handle correctly the onclick', () => {
        const component = getShallowWrapper(props);
        const button = component.first();
        button.simulate('click');
        expect(mockOnRetire).toHaveBeenCalled();
    });
});
