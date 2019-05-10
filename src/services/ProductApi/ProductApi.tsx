const ProductApi = {
  getProduct
};

function getProduct() {
  return fetch('http://www.mocky.io/v2/5c6c3a92320000e83bbef971')
    .then(response => response.json())
    .then(response => response.product)
    .catch(error => console.error(error)); // TODO: Add an error handler
}

export default ProductApi;