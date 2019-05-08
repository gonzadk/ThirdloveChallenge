require('./ProductSelector.scss');

import React from 'react';
import Dropdown from '../../core-components/Dropdown/Dropdown';
import { CirclePicker } from 'react-color';
import * as _ from 'lodash';

const COLORS = ['#D9E3F0', '#F47373', '#697689'];
const ID_PROPERTY = 'id';
const BAND_SIZE_PROPERTY = 'bandSize';
const CUP_SIZE_PROPERTY = 'cupSize';
const BAND_SIZE_LENGHT = 2;

class ProductSelector extends React.Component {
  formatOptions(variants) {
    const options = {};

    return _.each(variants, variant => {
      if (!options[variant.option1]) {
        options[variant.option1] = [];
      }
      const cupSize = _.last(variant.option2);
      const bandSize = variant.option2.substring(0, BAND_SIZE_LENGHT);
      options[variant.option1].push({
        colorName: variant.option1,
        id: variant.id,
        price: variant.price,
        inventory_quantity: variant.inventory_quantity,
        bandSize,
        cupSize
      });
    });
  }

  render() {
    const selectedColor = 'blue';
    const stock = 88;
    
    const options = this.formatOptions(this.props.variants);

    return (
      <section className="product-selector">
        <span> COLOR: {selectedColor} </span>
        <CirclePicker colors={COLORS}/>
        <span> STOCK: {stock} </span>

        <Dropdown title={'Band Size'}
                  options={options}
                  idProperty={ID_PROPERTY}
                  nameProperty={BAND_SIZE_PROPERTY}/>

        <Dropdown title={'Cup Size'}
                  options={options}
                  idProperty={ID_PROPERTY}
                  nameProperty={CUP_SIZE_PROPERTY}/>
      </section>
    );
  }
}

ProductSelector.defaultProps = {};

export default ProductSelector;