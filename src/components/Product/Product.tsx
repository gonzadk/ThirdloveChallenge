import React from 'react';
import Gallery from '../Gallery/Gallery';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductSelector from '../ProductSelector/ProductSelector';
import { ResponseImage, ResponseProduct } from "../../types/Product.types";

import './Product.scss';

type ProductProps = {};
type ProductState = {
  error: any,
  images: ResponseImage[],
  productDetails: any,
  productSelector: any,
  title: string
  isLoading: boolean
};
class Product extends React.Component<ProductProps, ProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      images: [],
      productDetails: null,
      productSelector: null,
      title: '',
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5c6c3a92320000e83bbef971')
      .then(response => response.json())
      .then(response => response.product)
      .then(this.onSuccess.bind(this)); // TODO: Add an error handler
  }

  onSuccess(product: ResponseProduct) {
    const { body_html, images, title, variants } = product;

    this.setState({
      images,
      productDetails: { details: body_html },
      productSelector: { variants, onProductSelectorChange: this.onProductSelectorChange },
      title
    });
  }

  onProductSelectorChange() {}

  render() {
    const { title, images, productDetails, productSelector } = this.state;

    return (
      <section className="product">
        <h1 className="product__title"> { title } </h1>
        <h3 className="product__price"> $68 </h3>
        <Gallery images={images}/>
        { productSelector && <ProductSelector {...productSelector}/> }
        <ProductDetails {...productDetails}/>
      </section>
    );
  }
}

export default Product;