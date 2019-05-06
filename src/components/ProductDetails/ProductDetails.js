require('./ProductDetails.scss');

import DOMPurify from 'dompurify';
import React from 'react';

class ProductDetails extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <section className="product-details">
        <h2>Details</h2>

        {/* Avoid this kind of insertions if it is project in production */}
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(details)}}></div>
      </section>
    );
  }
}

ProductDetails.defaultProps = {};

export default ProductDetails;