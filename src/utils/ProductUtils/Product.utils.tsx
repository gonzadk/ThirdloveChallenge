import {
  Image,
  Product,
  ProductsByColor,
  ResponseImage,
  ResponseProduct,
  ResponseVariant
} from '../../types/ProductTypes/Product.types';
import * as _ from 'lodash';

const COLORS = ['#ffefe5', '#dab5a1', '#d49d89', '#6a3a33', '#524346'];

const ProductUtils = {
  COLORS,
  formatProduct
};

/**
 * After request is performed the product needs to be parse
 * and status needs to be set to propagate it to children
 * (Preselects the first option
 *
 * @param product
 */
function formatProduct(product: ResponseProduct): Product {
  const images = formatImages(product.images);
  const productsByColor: ProductsByColor[] = formatVariants(product.variants);

  return {
    title: product.title,
    details: product.body_html,
    id: product.id,
    images,
    productsByColor
  }
}

/**
 * Given an array of images returns a new array of images on a proper format
 *
 * @param images
 */
function formatImages(images: ResponseImage[]): Image[] {
  const HTTPS = 'https://';

  return _.map(images, (image: ResponseImage) => ({
    original: `${HTTPS}${image.src1000}`,
    thumbnail: `${HTTPS}${image.src100}`,
    bulletClass: 'bullet-class'
  }));
}

/**
 * Given an array of variants a new array of bras will be generated, grouped by color
 *
 * @param variants
 */
function formatVariants(variants: ResponseVariant[]): ProductsByColor[] {
  const productsByColor: ProductsByColor[] = [];

  _.each(variants, (variant: ResponseVariant) => {
    let colorIndex =_.findIndex(productsByColor, {name: variant.option1});
    if (colorIndex === -1) {
      colorIndex = productsByColor.length;
      productsByColor.push({
        hex: COLORS[colorIndex], // We assume only 5 different colors will be returned
        name: variant.option1,
        productsByBand: []
      });
    }

    const { productsByBand } = productsByColor[colorIndex];
    const bandSize: string = getBandSize(variant);
    let bandIndex = _.findIndex(productsByBand, {size: bandSize});

    if (bandIndex === -1) {
      bandIndex = productsByBand.length;
      productsByBand.push({
        size: bandSize,
        productsByCup: []
      });
    }

    const { productsByCup } = productsByBand[bandIndex];
    productsByCup.push({
      id: variant.id,
      price: variant.price,
      stock: variant.inventory_quantity,
      size: getCupSize(variant)
    });
  });

  return productsByColor;
}

/**
 * Given a combined cup and band size returns just the "band size"
 *
 * @param variant
 */
function getBandSize(variant: ResponseVariant): string {
  return variant.option2.substring(0, 2);
}

/**
 * Given a combined cup and band size returns just the "cup size"
 *
 * @param variant
 */
function getCupSize(variant: ResponseVariant): string {
  return variant.option2.substring(2, 3);
}


export default ProductUtils;