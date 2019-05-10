import React from 'react';
import ImageGallery from 'react-image-gallery';
import * as _ from 'lodash';
import { ResponseImage } from "../../types/Product.types";

import './Gallery.scss';

const HTTPS = 'https://';

type GalleryProps = {
  images: ResponseImage[]
};
type GalleryState = {};

class Gallery extends React.Component<GalleryProps, GalleryState> {
  render() {
    const isDesktop = false;
    const images = _.map(this.props.images, (image: ResponseImage) => ({
      original: `${HTTPS}${image.src1000}`,
      thumbnail: `${HTTPS}${image.src100}`,
      bulletClass: 'bullet-class'
    }));

    return (
      <section className="gallery">
        <ImageGallery items={images}
                      showNav={false}
                      showThumbnails={isDesktop}
                      thumbnailPosition={'left'}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      showBullets={!isDesktop}/>
      </section>
    );
  }
}

export default Gallery;