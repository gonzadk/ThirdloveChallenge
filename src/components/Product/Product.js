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
      details: null,
      images: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5c6c3a92320000e83bbef971')
      .then(response => response.json())
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));
  }

  onSuccess(response) {
    const { body_html, images, title, variants } = response.product;

    this.setState({
      gallery: { images },
      isLoading: false,
      productDetails: { details: body_html },
      productSelector: { title, variants }
    });
  }

  onError(error) {
    this.setState({
      error, // TODO: Create an error handler
      isLoading: false
    });
  }

  render() {
    const { gallery, productDetails, productSelector } = this.state;

    return (
      <section className="product">
        <Gallery {...gallery}/>
        <ProductDetails {...productDetails}/>
        <aside>
          <ProductSelector {...productSelector}/>
        </aside>
      </section>
    );
  }
}

Product.defaultProps = {};

export default Product;