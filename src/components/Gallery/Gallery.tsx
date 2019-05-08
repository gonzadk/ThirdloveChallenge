import React from 'react';
import ImageGallery from 'react-image-gallery';
import * as _ from 'lodash';

import './Gallery.scss';

const HTTPS = 'https://';

type MyProps = {
  images: any
};
type MyState = {};

class Gallery extends React.Component<MyProps, MyState> {
  render() {
    const isDesktop = false;
    const images = _.map(this.props.images, image => ({
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