const ProductApi = {
  getProduct
};

const QUERY: string = 'https://www.mocky.io/v2/5c6c3a92320000e83bbef971';

/**
 * Performs the call to get the product
 */
function getProduct() {
  return window.fetch(QUERY)
    .then(response => response.json())
    .then(response => response.product)
    .catch(error => console.error(error)); // TODO: Add an error handler
}

export default ProductApi;