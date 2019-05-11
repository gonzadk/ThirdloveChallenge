import React from 'react';
import ProductApi from './ProductApi';

describe('ProductApi', () => {
  it('should call to fetch and return just the product', () => {
    // ARRANGE
    const response = {
      json: jasmine.createSpy('json').and.returnValue({ product: 'some product' })
    };
    spyOn(global, 'fetch').and.returnValue(Promise.resolve(response));

    // ACT
    ProductApi.getProduct().then(
      product => {

        // ASSERT
        expect(product).toBe('some product');
      }
    );
  });
});