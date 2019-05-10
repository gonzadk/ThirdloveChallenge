import React from 'react';
import Gallery from '../../components/Gallery/Gallery';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import ProductSelector from '../../components/ProductSelector/ProductSelector';
import {
  BraSet,
  Image,
  ResponseImage,
  ResponseProduct,
  ResponseVariant
} from '../../types/Product.types';
import ProductApi from '../../services/ProductApi/ProductApi';
import * as _ from 'lodash';

import './ProductPage.scss';

type ProductProps = {};
type ProductState = {
  braSet: BraSet,
  error: any,
  images: Image[],
  isLoading: boolean,
  productDetails: any,
  selectedBandSize: string,
  selectedColor: string,
  selectedCupSizeIndex: number,
  title: string
};
class ProductPage extends React.Component<ProductProps, ProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      images: [],
      isLoading: true,
      productDetails: null,
      braSet: {},
      selectedBandSize: '',
      selectedColor: '',
      selectedCupSizeIndex: 0,
      title: ''
    };
  }

  /**
   * Hook to be executed after component is mounted
   */
  componentDidMount() {
    ProductApi.getProduct()
      .then(this.formatProduct.bind(this));
  }


  /**
   * After request is performed the product needs to be parse
   * and status needs to be set to propagate it to children
   * (Preselects the first option
   *
   * @param product
   */
  formatProduct(product: ResponseProduct): void {
    const images = this.formatImages(product.images);
    const braSet: BraSet = this.formatVariants(product.variants);

    this.setState({
      braSet,
      images,
      productDetails: { details: product.body_html },
      selectedBandSize: this.getBandSize(product.variants[0]),
      selectedColor: product.variants[0].option1,
      title: product.title
    });
  }

  /**
   * Given an array of images returns a new array of images on a proper format
   *
   * @param images
   */
  formatImages(images: ResponseImage[]): Image[] {
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
  formatVariants(variants: ResponseVariant[]): BraSet {
    const braSet: BraSet = {};

    _.each(variants, (variant: ResponseVariant) => {
      if (!braSet[variant.option1]) {
        braSet[variant.option1] = {};
      }
      const bandSize: string = this.getBandSize(variant);

      if (!braSet[variant.option1][bandSize]) {
        braSet[variant.option1][bandSize] = [];
      }
      braSet[variant.option1][bandSize].push({
        id: variant.id,
        price: variant.price,
        stock: variant.inventory_quantity,
        cupSize: this.getCupSize(variant)
      });
    });

    return braSet;
  }

  /**
   * Given a combined cup and band size returns just the "band size"
   *
   * @param variant
   */
  getBandSize(variant: ResponseVariant): string {
    return variant.option2.substring(0, 2);
  }

  /**
   * Given a combined cup and band size returns just the "cup size"
   *
   * @param variant
   */
  getCupSize(variant: ResponseVariant): string {
    return variant.option2.substring(2, 3);
  }

  /**
   * Sets the new state when a new color is selected
   */
  onProductSelectorChange() {}

  render() {
    const {
      braSet,
      images,
      productDetails,
      selectedBandSize,
      selectedColor,
      selectedCupSizeIndex,
      title
    } = this.state;

    return (
      <section className="product">
        <h1 className="product__title"> { title } </h1>
        <h3 className="product__price"> $68 </h3>
        <Gallery images={images}/>
        { !_.isEmpty(braSet) && <ProductSelector braSet={braSet}
                                     onProductSelectorChange={this.onProductSelectorChange}
                                     selectedColor={selectedColor}
                                     selectedCupSizeIndex={selectedCupSizeIndex}
                                     selectedBandSize={selectedBandSize}/> }
        <ProductDetails {...productDetails}/>
      </section>
    );
  }
}

export default ProductPage;