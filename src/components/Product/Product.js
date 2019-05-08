require('./Product.scss');

import Gallery from '../Gallery/Gallery';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductSelector from '../ProductSelector/ProductSelector';
import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      gallery: null,
      productDetails: null,
      productSelector: null,
      title: null
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5c6c3a92320000e83bbef971')
      .then(response => response.json())
      .then(this.onSuccess.bind(this)); // TODO: Add an error handler
  }

  onSuccess(response) {
    const { body_html, images, title, variants } = response.product;

    this.setState({
      gallery: { images },
      productDetails: { details: body_html },
      productSelector: { variants, onProductSelectorChange: this.onProductSelectorChange },
      title
    });
  }

  onProductSelectorChange() {

  }

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

Product.defaultProps = {};

export default Product;