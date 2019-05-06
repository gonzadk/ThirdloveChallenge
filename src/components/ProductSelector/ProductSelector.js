require('./ProductSelector.scss');

import React from 'react';

class ProductSelector extends React.Component {
  render() {
    return (
      <section className="product-selector">
        Product Selector
      </section>
    );
  }
}

ProductSelector.defaultProps = {};

export default ProductSelector;