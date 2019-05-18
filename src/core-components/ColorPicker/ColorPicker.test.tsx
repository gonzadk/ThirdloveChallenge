import React from 'react';
import { mount } from 'enzyme';
import ColorPicker from './ColorPicker';
import { ReactTestInstance } from 'react-test-renderer';

describe('ColorPicker', () => {
  let component: any;
  afterEach(() => {
    component = null;
  });

  it('should propagate a selection', () => {
    // ARRANGE
    const colorPickerProps = {
      onChange: jasmine.createSpy('onChange'),
      colors: ['#333', '#ccc'],
      selectedColor: '#333'
    };
    component = mount(<ColorPicker {...colorPickerProps}/>);
    const event = {};

    // ACT
    component.find('.cc-color-picker__color:not(.cc-color-picker__color--selected)')
      .simulate('click', event);

    // ASSERT
    expect(colorPickerProps.onChange).toHaveBeenCalledTimes(1);
    expect(colorPickerProps.onChange).toHaveBeenCalledWith('#ccc');
  });

  it('should generate the correct amount of colors', () => {
    // ARRANGE
    const colorPickerProps = {
      onChange: jasmine.createSpy('onChange'),
      colors: ['#333', '#ccc', '#fff'],
      selectedColor: '#333'
    };
    component = mount(<ColorPicker {...colorPickerProps}/>);

    // ACT
    const colors = component.find('.cc-color-picker__color');

    // ASSERT
    expect(colors.length).toBe(3);
  });
});
