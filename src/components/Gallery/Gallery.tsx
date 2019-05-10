import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Image } from '../../types/Product.types';

import './Gallery.scss';

type GalleryProps = {
  images: Image[]
};
type GalleryState = {};

class Gallery extends React.Component<GalleryProps, GalleryState> {
  render() {
    const isDesktop = false;
    const { images } = this.props;

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