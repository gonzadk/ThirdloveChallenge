import React from 'react';
import ProductPage from './ProductPage';
import { shallow } from 'enzyme';
import ProductApi from '../../services/ProductApi/ProductApi';
import { Product, ProductsByColor } from '../../types/ProductTypes/Product.types';
import ProductUtils from '../../utils/ProductUtils/Product.utils';

describe('ProductPage', () => {
  let component: any;
  let product: Product;

  beforeEach(() => {
    const products: ProductsByColor[] = [{
      hex: '#333',
      name: 'gray',
      bands: [{
        size: '32',
        cups: [
          { size: 'D', id: 0, price: '23.00', stock: 23 },
          { size: 'F', id: 1, price: '23.00', stock: 23 }
        ]
      }, {
        size: '32',
        cups: [
          { size: 'D', id: 2, price: '23.00', stock: 23 },
          { size: 'F', id: 3, price: '23.00', stock: 23 }
        ]
      }]
    }, {
      hex: '#666',
      name: 'gray',
      bands: [{
        size: '32',
        cups: [
          { size: 'D', id: 4, price: '23.00', stock: 23 },
          { size: 'F', id: 5, price: '23.00', stock: 23 }
        ]
      }, {
        size: '32',
        cups: [
          { size: 'D', id: 6, price: '68.00', stock: 23 },
          { size: 'F', id: 7, price: '68.00', stock: 23 }
        ]
      }]
    }];
    product = {
      colors: products,
      details: 'some product details',
      id: 0,
      title: 'some product title',
      images: [{
        original: 'original link',
        thumbnail: 'thumbnail link',
        bulletClass: 'bullet class'
      }]
    };
    spyOn(ProductApi, 'getProduct').and.returnValue(Promise.resolve(product));
    spyOn(ProductUtils, 'formatProduct').and.callFake(product => product);
    component = shallow(<ProductPage/>);
  });

  afterEach(() => {
    component = null;
  });

  describe('mounting', () => {
    it('should get the product after mounting', () => {
      // ARRANGE

      // ACT

      // ASSERT
      expect(ProductApi.getProduct).toHaveBeenCalledTimes(1);
    });

    it('should format product after getting it', () => {
      // ARRANGE

      // ACT

      // ASSERT
      expect(ProductUtils.formatProduct).toHaveBeenCalledTimes(1);
    });

    it('should set initial state', () => {
      // ARRANGE
      const state = component.state();
      const expectedState = {
        productsByColor: product.colors,
        images: product.images,
        details: product.details,
        title: product.title,
        selectedBand: 0,
        selectedColor: 0,
        selectedCup: 0
      };

      // ACT

      // ASSERT
      expect(state).toStrictEqual(expectedState);
    });
  });

  describe('handle selections', () => {
    it('should handle a color change', () => {
      // ARRANGE
      component.instance().setState({
        selectedColor: 0,
        selectedBand: 1,
        selectedCup: 1
      });
      const change = { colorHex: '#666' };

      // ACT
      component.instance().onProductSelectorChange(change);
      const state = component.state();

      // ASSERT
      expect(state.selectedColor).toBe(1);
      expect(state.selectedBand).toBe(0);
      expect(state.selectedCup).toBe(0);
    });

    it('should handle a band change', () => {
      // ARRANGE
      component.instance().setState({
        selectedColor: 1,
        selectedBand: 0,
        selectedCup: 1
      });
      const change = { bandSize: 1 };

      // ACT
      component.instance().onProductSelectorChange(change);
      const state = component.state();

      // ASSERT
      expect(state.selectedColor).toBe(1);
      expect(state.selectedBand).toBe(1);
      expect(state.selectedCup).toBe(0);
    });

    it('should handle a cup change', () => {
      // ARRANGE
      component.instance().setState({
        selectedColor: 1,
        selectedBand: 1,
        selectedCup: 0
      });
      const change = { cupSize: 1 };

      // ACT
      component.instance().onProductSelectorChange(change);
      const state = component.state();

      // ASSERT
      expect(state.selectedColor).toBe(1);
      expect(state.selectedBand).toBe(1);
      expect(state.selectedCup).toBe(1);
    });
  });
  describe('format price', () => {
    it('should format the price', () => {
      // ARRANGE

      // ACT
      const price = component.instance().getPrice();

      // ASSERT
      expect(price).toBe('$23');
    });
  });
});
