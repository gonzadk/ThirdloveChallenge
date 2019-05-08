require('./ProductDetails.scss');

import DOMPurify from 'dompurify';
import React from 'react';

class ProductDetails extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <section className="product-details">
        <h2 className="product-details__title">Details</h2>

        {/* TODO: Modify API to return a json instead of plain HTML */}
        <div className="product-details__details" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(details)}}></div>
      </section>
    );
  }
}

ProductDetails.defaultProps = {};

export default ProductDetails;