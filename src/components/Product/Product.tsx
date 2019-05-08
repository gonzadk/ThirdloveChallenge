import React from 'react';
import Gallery from '../Gallery/Gallery';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductSelector from '../ProductSelector/ProductSelector';

import './Product.scss';

type MyProps = {};
type MyState = {
  error: any,
  gallery: any,
  productDetails: any,
  productSelector: any,
  title: string
  isLoading: boolean
};
class Product extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      gallery: null,
      productDetails: null,
      productSelector: null,
      title: '',
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5c6c3a92320000e83bbef971')
      .then(response => response.json())
      .then(this.onSuccess.bind(this)); // TODO: Add an error handler
  }

  onSuccess(response: any) {
    const { body_html, images, title, variants } = response.product;

    this.setState({
      gallery: { images },
      productDetails: { details: body_html },
      productSelector: { variants, onProductSelectorChange: this.onProductSelectorChange },
      title
    });
  }

  onProductSelectorChange() {}

  render() {
    const { title, gallery, productDetails, productSelector } = this.state;

    return (
      <section className="product">
        <h1 className="product__title"> { title } </h1>
        <h3 className="product__price"> $68 </h3>
        <Gallery {...gallery}/>
        <ProductSelector {...productSelector}/>
        <ProductDetails {...productDetails}/>
      </section>
    );
  }
}

export default Product;