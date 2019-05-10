import React from 'react';
import Dropdown from '../../core-components/Dropdown/Dropdown';
import { CirclePicker } from 'react-color';
import Button from "../../core-components/Button/Button";
import { Bras, BraCup, BraSet } from '../../types/Product.types';

import './ProductSelector.scss';
import * as _ from 'lodash';

const COLORS = ['#D9E3F0', '#F47373', '#697689'];
const ID_PROPERTY = 'id';
const BAND_SIZE_PROPERTY = 'name';
const CUP_SIZE_PROPERTY = 'cupSize';
const BUTTON_LABEL = 'Add to Bag';

type ProductSelectorProps = {
  braSet: BraSet,
  onProductSelectorChange(): void,
  selectedBandSize: string,
  selectedColor: string,
  selectedCupSizeIndex: number
};
type ProductSelectorState = {};
class ProductSelector extends React.Component<ProductSelectorProps, ProductSelectorState> {
  onClick() {
    window.alert('Sarasa');
  }

  generateBandSizeOptions(bras: Bras) {
    return _.map(bras, (bra, bandSize) => ({
      name: bandSize
    }));
  }

  render() {
    const { braSet, selectedBandSize, selectedColor, selectedCupSizeIndex } = this.props;

    const bandSizeOptions = this.generateBandSizeOptions(braSet[selectedColor]);
    const selectedBra: BraCup = braSet[selectedColor][selectedBandSize][selectedCupSizeIndex];

    return (
      <section className="product-selector">
        <div className="product-selector__color-container">
          <span> COLOR: {selectedColor} </span>
          <div className="product-selector__color-container__color-picker">
            <CirclePicker colors={COLORS}/>
          </div>
          <span> STOCK: {selectedBra.stock} </span>
        </div>

        <div className="product-selector__dropdown-container">
          <Dropdown title={'Band Size'}
                    options={bandSizeOptions}
                    idProperty={BAND_SIZE_PROPERTY}
                    nameProperty={BAND_SIZE_PROPERTY}/>
        </div>

        <div className="product-selector__dropdown-container
                        product-selector__dropdown-container--right">
          <Dropdown title={'Cup Size'}
                    options={braSet[selectedColor][selectedBandSize]}
                    idProperty={ID_PROPERTY}
                    nameProperty={CUP_SIZE_PROPERTY}/>
        </div>

        <Button onClick={this.onClick} label={BUTTON_LABEL}/>
      </section>
    );
  }
}

export default ProductSelector;