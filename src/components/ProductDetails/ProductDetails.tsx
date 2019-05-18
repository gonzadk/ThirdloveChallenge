import React from 'react';
import DOMPurify from 'dompurify';

import './ProductDetails.scss';

type ProductDetailsProps = {
  details: any
};
type ProductDetailsState = {};

/**
 * It will render the details of a product
 */
class ProductDetails extends React.Component<ProductDetailsProps, ProductDetailsState> {
  render() {
    const { details } = this.props;

    return (
      <section className="product-details">
        <h2 className="product-details__title">Details</h2>

        {/* TODO: Modify API to return a json instead of plain HTML */}
        <div className="product-details__details"
             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}/>

      </section>
    );
  }
}

export default ProductDetails;