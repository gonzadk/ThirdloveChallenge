import React from 'react';
import Dropdown from '../../core-components/Dropdown/Dropdown';
import { CirclePicker } from 'react-color';
import * as _ from 'lodash';
import { Variant } from "../../types/Product.types";
import Button from "../../core-components/Button/Button";

import './ProductSelector.scss';

const COLORS = ['#D9E3F0', '#F47373', '#697689'];
const ID_PROPERTY = 'id';
const BAND_SIZE_PROPERTY = 'bandSize';
const CUP_SIZE_PROPERTY = 'cupSize';
const BAND_SIZE_LENGTH = 2;
const BUTTON_LABEL = 'Add to Bag';

type ProductSelectorProps = {
  details: string,
  variants: Variant[]
};
type ProductSelectorState = {};
class ProductSelector extends React.Component<ProductSelectorProps, ProductSelectorState> {
  selectedColor: string = '';

  formatOptions(variants: any) {
    const options: any = {};

    _.each(variants, (variant: any) => {
      if (!options[variant.option1]) {
        options[variant.option1] = [];
      }
      const cupSize = _.last(variant.option2);
      const bandSize = variant.option2.substring(0, BAND_SIZE_LENGTH);
      options[variant.option1].push({
        colorName: variant.option1,
        id: variant.id,
        price: variant.price,
        inventory_quantity: variant.inventory_quantity,
        bandSize,
        cupSize
      });
    });

    return options;
  }

  onClick() {
    window.alert('Sarasa');
  }

  render() {
    const selectedOption = 1;
    const stock = 88;

    const options = this.formatOptions(this.props.variants);
    this.selectedColor = this.props.variants[0].option1;

    return (
      <section className="product-selector">
        <div className="product-selector__color-container">
          <span> COLOR: {options['naked-1'][selectedOption].colorName} </span>
          <div className="product-selector__color-container__color-picker">
            <CirclePicker colors={COLORS}/>
          </div>
          <span> STOCK: {stock} </span>
        </div>

        <div className="product-selector__dropdown-container">
          <Dropdown title={'Band Size'}
                    options={options[this.selectedColor]}
                    idProperty={ID_PROPERTY}
                    nameProperty={BAND_SIZE_PROPERTY}/>
        </div>

        <div className="product-selector__dropdown-container
                        product-selector__dropdown-container--right">
          <Dropdown title={'Cup Size'}
                    options={options[this.selectedColor]}
                    idProperty={ID_PROPERTY}
                    nameProperty={CUP_SIZE_PROPERTY}/>
        </div>

        <Button onClick={this.onClick} label={BUTTON_LABEL}/>
      </section>
    );
  }
}

export default ProductSelector;