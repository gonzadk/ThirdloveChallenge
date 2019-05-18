import React from 'react';
import Gallery from '../../components/Gallery/Gallery';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import ProductSelector from '../../components/ProductSelector/ProductSelector';
import {
  Image,
  Product,
  ProductChange,
  ProductsByColor,
} from '../../types/ProductTypes/Product.types';
import ProductApi from '../../services/ProductApi/ProductApi';
import ProductUtils from '../../utils/ProductUtils/Product.utils';
import * as _ from 'lodash';

import './ProductPage.scss';

type ProductProps = {};
type ProductState = {
  productsByColor: ProductsByColor[],
  images: Image[],
  details: string,
  selectedBand: number,
  selectedColor: number,
  selectedCup: number,
  title: string
};
class ProductPage extends React.Component<ProductProps, ProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      details: '',
      productsByColor: [],
      selectedBand: 0,
      selectedColor: 0,
      selectedCup: 0,
      title: ''
    };
  }

  /**
   * Hook to be executed after component is mounted
   */
  componentDidMount() {
    ProductApi.getProduct()
      .then(ProductUtils.formatProduct)
      .then(this.onGetProductSuccess.bind(this));
  }

  /**
   * Sets the state after the product is retrieved
   * @param product
   */
  onGetProductSuccess(product: Product) {
    const { images, colors, title, details } = product;
    this.setState({
      productsByColor: colors,
      images,
      details,
      title
    });
  }

  /**
   * Sets the new state when a new color is selected
   */
  onProductSelectorChange(change: ProductChange) {
    if(change.colorHex) {
      const index: number =_.findIndex(this.state.productsByColor, {hex: change.colorHex});

      this.setState({
        selectedColor: index,
        selectedBand: 0,
        selectedCup: 0,
      })
    } else if(change.bandSize) {
      this.setState({
        selectedBand: change.bandSize,
        selectedCup: 0,
      })
    } else if(change.cupSize) {
      this.setState({
        selectedCup: change.cupSize
      })
    }
  }

  /**
   * Returns a formatted price to be correctly displayed
   */
  getPrice(): string {
    const { selectedBand, selectedColor, selectedCup, productsByColor } = this.state;
    let { price } = productsByColor[selectedColor].bands[selectedBand].cups[selectedCup];
    price = price.split('.')[0];

    return `$${price}`;
  }

  render() {
    const {
      details,
      images,
      selectedBand,
      selectedColor,
      selectedCup,
      productsByColor,
      title
    } = this.state;

    return (
      <div>
        {
          !_.isEmpty(productsByColor) &&
            <section className="product-page">
              <div className="product-page__title">
                <h1 className="product-page__title__label"> { title } </h1>
                <h3 className="product-page__title__price">
                  {!_.isEmpty(productsByColor) && this.getPrice.bind(this)() }
                </h3>
              </div>

              <article className="product-page__gallery">
                <Gallery images={images}/>
              </article>

              <article className="product-page__selector">
                <ProductSelector productsByColor={productsByColor}
                                 onProductSelectorChange={this.onProductSelectorChange.bind(this)}
                                 selectedBand={selectedBand}
                                 selectedColor={selectedColor}
                                 selectedCup={selectedCup}
                                 title={title}/>
              </article>

              <ProductDetails details={details}/>

            </section>
        }



      </div>
    );
  }
}

export default ProductPage;