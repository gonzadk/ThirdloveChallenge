import React from 'react';
import DOMPurify from 'dompurify';

import './ProductDetails.scss';

type MyProps = {
  details: any
};
type MyState = {};
class ProductDetails extends React.Component<MyProps, MyState> {
  render() {
    const { details } = this.props;

    return (
      <section className="product-details">
        <h2>Details</h2>

        {/* Avoid this kind of insertions if it is project in production */}
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}/>
      </section>
    );
  }
}

export default ProductDetails;