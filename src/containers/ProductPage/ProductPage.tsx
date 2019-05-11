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
  error: any,
  images: Image[],
  isLoading: boolean,
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
      error: null,
      images: [],
      isLoading: true,
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

  onGetProductSuccess(product: Product) {
    const { images, productsByColor, title, details } = product;
    this.setState({
      productsByColor,
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

  render() {
    const {
      images,
      details,
      selectedBand,
      selectedColor,
      selectedCup,
      productsByColor,
      title
    } = this.state;

    return (
      <section className="product">
        <h1 className="product__title"> { title } </h1>
        <h3 className="product__price"> $68 </h3>
        <Gallery images={images}/>
        {
          !_.isEmpty(productsByColor) &&
          <ProductSelector productsByColor={productsByColor}
                           onProductSelectorChange={this.onProductSelectorChange.bind(this)}
                           selectedBand={selectedBand}
                           selectedColor={selectedColor}
                           selectedCup={selectedCup}
                           title={title}/>
        }
        <ProductDetails details={details}/>
      </section>
    );
  }
}

export default ProductPage;