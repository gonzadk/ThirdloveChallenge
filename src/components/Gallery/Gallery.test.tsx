import React from 'react';
import { create } from 'react-test-renderer';
import Gallery  from './Gallery';

describe('Gallery', () => {
  it('should set the images', () => {
    // ARRANGE
    const images = [{
      bulletClass: 'bullet-class',
      original: 'someLink',
      thumbnail: 'someThumbnailLink'
    }];
    const component = create(<Gallery images={images}/>);

    // ACT
    const instance = component.getInstance();

    // ASSERT
    expect(instance.props.images).toBe(images);
  });

  it('should create the image gallery dependency', () => {
    // ARRANGE
    const images = [{
      bulletClass: 'bullet-class',
      original: 'someLink',
      thumbnail: 'someThumbnailLink'
    }];
    const component = create(<Gallery images={images}/>);

    // ACT
    const imageGallery = component.root.find(
      element => element.props.className === 'image-gallery '
    );

    // ASSERT
    expect(imageGallery).toBeDefined();
  });
});
