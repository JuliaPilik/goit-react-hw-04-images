import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ id, imgSrc, alt, onOpenModal }) {
  return (
    <li
      className={css.ImageGalleryItem}
      key={id}
      onClick={() => onOpenModal(imgSrc)}
    >
      <img src={imgSrc} alt={alt} className={css.ImageGalleryItem_image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onOpenModal: PropTypes.func.isRequired,
};
