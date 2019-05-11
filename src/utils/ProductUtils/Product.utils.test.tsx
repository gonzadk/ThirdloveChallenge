import React from 'react';
import ProductUtils from './Product.utils';
import { ProductsByColor, ResponseProduct, } from '../../types/ProductTypes/Product.types';

describe('ProductUtils', () => {
  it('should correctly format a product', () => {
    // ARRANGE
    const responseProduct: ResponseProduct = {
      body_html: 'product details',
      id: 0,
      images: [{ src100: 'link100', src600: 'link600', src1000: 'link1000' }],
      title: 'product title',
      variants: [
        { id: 0, price: '23.00', option1: 'naked-1', option2: '32D', inventory_quantity: 3 },
        { id: 1, price: '23.00', option1: 'naked-1', option2: '32F', inventory_quantity: 4 },
        { id: 2, price: '23.00', option1: 'naked-1', option2: '33D', inventory_quantity: 5 },
        { id: 3, price: '23.00', option1: 'naked-1', option2: '33F', inventory_quantity: 6 },
        { id: 4, price: '23.00', option1: 'naked-2', option2: '32D', inventory_quantity: 7 },
        { id: 5, price: '23.00', option1: 'naked-2', option2: '32F', inventory_quantity: 8 },
        { id: 6, price: '23.00', option1: 'naked-2', option2: '33D', inventory_quantity: 9 },
        { id: 7, price: '23.00', option1: 'naked-2', option2: '33F', inventory_quantity: 10 }
      ]
    };

    const products: ProductsByColor[] = [{
      hex: '#ffefe5',
      name: 'naked-1',
      bands: [{
        size: '32',
        cups: [
          { size: 'D', id: 0, price: '23.00', stock: 3 },
          { size: 'F', id: 1, price: '23.00', stock: 4 }
        ]
      }, {
        size: '33',
        cups: [
          { size: 'D', id: 2, price: '23.00', stock: 5 },
          { size: 'F', id: 3, price: '23.00', stock: 6 }
        ]
      }]
    }, {
      hex: '#dab5a1',
      name: 'naked-2',
      bands: [{
        size: '32',
        cups: [
          { size: 'D', id: 4, price: '23.00', stock: 7 },
          { size: 'F', id: 5, price: '23.00', stock: 8 }
        ]
      }, {
        size: '33',
        cups: [
          { size: 'D', id: 6, price: '23.00', stock: 9 },
          { size: 'F', id: 7, price: '23.00', stock: 10 }
        ]
      }]
    }];
    const expectedProduct = {
      colors: products,
      details: 'product details',
      id: 0,
      title: 'product title',
      images: [{
        original: 'https://link1000',
        thumbnail: 'https://link100',
        bulletClass: 'bullet-class'
      }]
    };

    // ACT
    const returnedProduct = ProductUtils.formatProduct(responseProduct);

    // ASSERT
    expect(returnedProduct).toStrictEqual(expectedProduct);
  });
});