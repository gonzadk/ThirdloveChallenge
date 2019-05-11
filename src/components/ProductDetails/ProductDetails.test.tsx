import React from 'react';
import { create } from 'react-test-renderer';
import ProductDetails from './ProductDetails';
import DOMPurify from 'dompurify';

describe('ProductDetails', () => {
  it('should set the details', () => {
    // ARRANGE
    const details = 'some details';
    const component = create(<ProductDetails details={details}/>);

    // ACT
    const instance = component.getInstance();

    // ASSERT
    expect(instance.props.details).toBe(details);
  });

  it('should sanitize the details', () => {
    // ARRANGE
    const details = 'some details';
    spyOn(DOMPurify, 'sanitize');
    const component = create(<ProductDetails details={details}/>);

    // ACT
    component.getInstance();

    // ASSERT
    expect(DOMPurify.sanitize).toHaveBeenCalledTimes(1);
  });
});
