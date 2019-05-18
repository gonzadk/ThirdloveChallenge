import React from 'react';
import Dropdown from '../../core-components/Dropdown/Dropdown';
import Button from "../../core-components/Button/Button";
import {
  ProductChange, ProductsByBand,
  ProductsByColor,
  ProductsByCup
} from '../../types/ProductTypes/Product.types';

import './ProductSelector.scss';
import ProductUtils from '../../utils/ProductUtils/Product.utils';
import ColorPicker from '../../core-components/ColorPicker/ColorPicker';

const SIZE_PROPERTY = 'size';
const BUTTON_LABEL = 'Add to Bag';

type ProductSelectorProps = {
  productsByColor: ProductsByColor[],
  onProductSelectorChange(change: ProductChange): void,
  selectedBand: number,
  selectedColor: number,
  selectedCup: number,
  title: string
};
type ProductSelectorState = {};

/**
 * Product selector will contain the options user could customize
 *
 * NOTE: library used to render the color picker doesn't offer a way to know which color is selected
 * via css and because of that the way that the selected color is shown to the user is not the same
 * that the one proposed on the mocks
 */
class ProductSelector extends React.Component<ProductSelectorProps, ProductSelectorState> {
  constructor(props: ProductSelectorProps) {
    super(props);
    this.getBand = this.getBand.bind(this);
    this.getCup = this.getCup.bind(this);
    this.onAddToBag = this.onAddToBag.bind(this);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onBandChange = this.onBandChange.bind(this);
    this.onCupChange = this.onCupChange.bind(this);
  }
  /**
   * Returns the selected band
   */
  getBand(): ProductsByBand {
    const { productsByColor, selectedBand, selectedColor } = this.props;
    return productsByColor[selectedColor].bands[selectedBand];
  }

  /**
   * Returns the selected cup
   */
  getCup(): ProductsByCup {
    const { productsByColor, selectedBand, selectedColor, selectedCup } = this.props;
    return productsByColor[selectedColor].bands[selectedBand].cups[selectedCup];
  }

  /**
   * Handles click on "Add to bug" button and shows an alert with the selected product
   */
  onAddToBag() {
    const { title } = this.props;
    const band: ProductsByBand = this.getBand();
    const cup: ProductsByCup = this.getCup();

    window.alert(`Added a ${title} - ${band.size}${cup.size} to the cart`);
  }

  /**
   * Handles a change on the selected color and sends the change to the parent
   * @param color
   */
  onColorSelected(color: string) {
    const change: ProductChange = { colorHex: color };
    this.props.onProductSelectorChange(change);
  }

  /**
   * Handles a change on the selected band and sends the change to the parent
   * @param band
   */
  onBandChange(band: any): void {
    const change: ProductChange = { bandSize: band.target.value };
    this.props.onProductSelectorChange(change);
  }

  /**
   * Handles a change on the selected cup and sends the change to the parent
   * @param cup
   */
  onCupChange(cup: any): void {
    const change: ProductChange = { cupSize: cup.target.value };
    this.props.onProductSelectorChange(change);
  }

  render() {
    const { productsByColor, selectedColor, selectedBand, selectedCup } = this.props;

    const band = this.getBand();
    const cup = this.getCup();

    return (
      <section className="product-selector">
        <div className="product-selector__color-container">

          <p className="product-selector__row">
            <span className="product-selector__row--title"> COLOR: </span>
            <span className="product-selector__row--value">
                {productsByColor[selectedColor].name}
              </span>
          </p>

          <div className="product-selector__color-container__color-picker">
            <ColorPicker colors={ProductUtils.COLORS}
                         selectedColor={ProductUtils.COLORS[selectedColor]}
                         onChange={this.onColorSelected}/>
          </div>

          <p className="product-selector__row">
            <span className="product-selector__row--title"> STOCK: </span>
            <span className="product-selector__row--value">
              {cup.stock}
            </span>
          </p>

        </div>

        <div className="product-selector__dropdown-container
                        product-selector__dropdown-container--left">
          <Dropdown title={'Band Size'}
                    options={productsByColor[selectedColor].bands}
                    value={selectedBand}
                    onChange={this.onBandChange}
                    property={SIZE_PROPERTY}/>
        </div>

        <div className="product-selector__dropdown-container
                        product-selector__dropdown-container--right">
          <Dropdown title={'Cup Size'}
                    options={band.cups}
                    value={selectedCup}
                    onChange={this.onCupChange}
                    property={SIZE_PROPERTY}/>
        </div>

        <Button onClick={this.onAddToBag} label={BUTTON_LABEL} disabled={cup.stock === 0}/>
      </section>
    );
  }
}

export default ProductSelector;