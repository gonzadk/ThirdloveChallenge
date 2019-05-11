import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Image } from '../../types/ProductTypes/Product.types';

import './Gallery.scss';

type GalleryProps = {
  images: Image[]
};
type GalleryState = {};

class Gallery extends React.Component<GalleryProps, GalleryState> {
  render() {
    const { images } = this.props;

    return (
      <section className="gallery">
        <ImageGallery items={images}
                      showNav={false}
                      showThumbnails={true}
                      thumbnailPosition={'left'}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      showBullets={true}/>
      </section>
    );
  }
}

export default Gallery;