import React from 'react';
import Gallery from '../Gallery/Gallery';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductSelector from '../ProductSelector/ProductSelector';

import './Product.scss';

type MyProps = {};
type MyState = {
  gallery: any,
  error: any,
  productDetails: any,
  productSelector: any,
  isLoading: boolean
};
class Product extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      productDetails: null,
      productSelector: null,
      gallery: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5c6c3a92320000e83bbef971')
      .then(response => response.json())
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));
  }

  onSuccess(response: any) {
    const { body_html, images, title, variants } = response.product;

    this.setState({
      gallery: { images },
      isLoading: false,
      productDetails: { details: body_html },
      productSelector: { title, variants }
    });
  }

  onError(error: any) {
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

export default Product;