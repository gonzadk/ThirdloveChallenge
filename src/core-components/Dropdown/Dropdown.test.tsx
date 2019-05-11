import React from 'react';
import Dropdown from './Dropdown';
import { mount } from 'enzyme';

describe('Dropdown', () => {
  let component: any;
  afterEach(() => {
    component = null;
  });

  it('should propagate a change', () => {
    // ARRANGE
    const dropdownProps = {
      onChange: jasmine.createSpy('onChange'),
      options: [{ size: 32 }, { size: 33 }, { size: 34 }],
      property: 'size',
      title: 'some title',
      value: 0
    };
    component = mount(<Dropdown {...dropdownProps}/>);
    const event = { target: { value: 1 } };

    // ACT
    component.find('.cc-dropdown__select').simulate('change', event);

    // ASSERT
    expect(dropdownProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should generate the options', () => {
    // ARRANGE
    const dropdownProps = {
      onChange: jasmine.createSpy('onChange'),
      options: [{ size: 32 }, { size: 33 }, { size: 34 }],
      property: 'size',
      title: 'some title',
      value: 0
    };
    component = mount(<Dropdown {...dropdownProps}/>);

    // ACT
    const options = component.find('.cc-dropdown__select option');

    // ASSERT
    expect(options.length).toBe(3);
  });
});
