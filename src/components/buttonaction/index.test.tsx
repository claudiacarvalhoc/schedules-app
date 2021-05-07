import React from 'react';
import ButtonAction from './index';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const getShallowWrapper = ({ text, onClick = undefined }) => {
    return shallow(
        <ButtonAction text={text} onClick={onClick} />
    );
  };

describe('<Header />', () => {
    it('render correctly', () => {
        const props = {
            text: 'Retire',
        };
        const component = getShallowWrapper(props);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('handle correctly the onclick', () => {
        const mockOnRetire = jest.fn();
        const props = {
            text: 'Retire',
            onClick: mockOnRetire,
        };
        const component = getShallowWrapper(props);
        const button = component.first();
        button.simulate('click');
        expect(mockOnRetire).toHaveBeenCalled();
    });
});
