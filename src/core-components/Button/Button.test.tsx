import React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';

describe('Button', () => {
  let component: any;
  afterEach(() => {
    component = null;
  });

  it('should propagate a click', () => {
    // ARRANGE
    const buttonProps = {
      disabled: false,
      onClick: jasmine.createSpy('onClick'),
      label: 'some label'
    };
    component = shallow(<Button {...buttonProps}/>);

    // ACT
    component.simulate('click');

    // ASSERT
    expect(buttonProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should disable the button', () => {
    // ARRANGE
    const buttonProps = {
      disabled: true,
      onClick: jasmine.createSpy('onClick'),
      label: 'some label'
    };

    // ACT
    component = shallow(<Button {...buttonProps}/>);

    // ASSERT
    expect(component.instance().props.disabled).toBe(true);
  });
});
