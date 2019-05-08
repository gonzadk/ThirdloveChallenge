require('./Gallery.scss');

import ImageGallery from 'react-image-gallery';
import React from 'react';
import * as _ from 'lodash';

const HTTPS = 'https://';

class Gallery extends React.Component {
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

Gallery.defaultProps = {};

export default Gallery;