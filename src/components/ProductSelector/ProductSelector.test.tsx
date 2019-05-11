import React from 'react';
import ProductSelector from './ProductSelector';
import { shallow } from 'enzyme';
import { ProductsByColor } from '../../types/ProductTypes/Product.types';

describe('ProductSelector', () => {
  let component: any;
  let props: any;

  beforeEach(() => {
    const products: ProductsByColor[] = [{
      hex: '#333',
      name: 'gray',
      bands: [{
        size: '32',
        cups: [{
          size: 'D',
          id: 0,
          price: '68.00',
          stock: 23
        }]
      }]
    }];
    props = {
      productsByColor: products,
      onProductSelectorChange: jasmine.createSpy('onProductSelectorChange'),
      selectedBand: 0,
      selectedColor: 0,
      selectedCup: 0,
      title: 'some title'
    };

    component = shallow(<ProductSelector {...props}/>);
  });

  afterEach(() => {
    component = null;
  });

  describe('handle changes', () => {
    it('should handle a color selection', () => {
      // ARRANGE
      const color = {hex: '#333'};

      // ACT
      component.instance().onColorSelected(color);

      // ASSERT
      expect(props.onProductSelectorChange).toHaveBeenCalledTimes(1);
      expect(props.onProductSelectorChange).toHaveBeenCalledWith({ colorHex: '#333' });
    });

    it('should handle a band selection', () => {
      // ARRANGE
      const band = {target: {value: 0}};

      // ACT
      component.instance().onBandChange(band);

      // ASSERT
      expect(props.onProductSelectorChange).toHaveBeenCalledTimes(1);
      expect(props.onProductSelectorChange).toHaveBeenCalledWith({ bandSize: 0 });
    });

    it('should handle a cup selection', () => {
      // ARRANGE
      const cup = {target: {value: 0}};

      // ACT
      component.instance().onCupChange(cup);

      // ASSERT
      expect(props.onProductSelectorChange).toHaveBeenCalledTimes(1);
      expect(props.onProductSelectorChange).toHaveBeenCalledWith({ cupSize: 0 });
    });
  });

  describe('button', () => {
    it('should trigger an alert when button is clicked', () => {
      // ARRANGE
      spyOn(window, 'alert');
      const message = 'Added a some title - 32D to the cart';

      // ACT
      component.instance().onAddToBag();

      // ASSERT
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(message);
    });
  });
});
