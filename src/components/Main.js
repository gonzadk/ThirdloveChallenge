require('normalize.css/normalize.css');
require('styles/App.css');

import Product from './Product/Product';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <Product/>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
