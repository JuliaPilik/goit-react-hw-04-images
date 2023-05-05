import React, { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import { getImageGallery } from '../../api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';

export default function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageLargeSrc, setImageLargeSrc] = useState('');
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageName !== '') {
      setImages([]);
      setPage(1);
      setTotalResult(0);
      setLoading(true);
    }
  }, [imageName]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        getImageGallery(imageName, page, per_page)
          .then(res => res.data)
          .then(({ hits, totalHits }) => {
            setImages([...images, ...hits]);
            setError('');
            setPage(page + 1);
            setTotalResult(totalHits);
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 600);
    }
  }, [page, loading, imageName, images, per_page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const insertImgInModal = srcImg => {
    toggleModal();
    setImageLargeSrc(srcImg);
  };

  const loadMore = () => {
    if (images.length < totalResult && images.length > 0) {
      setLoading(true);
    }
  };

  return (
    <div>
      <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            imgSrc={webformatURL}
            alt={tags}
            onOpenModal={insertImgInModal}
          />
        ))}
      </ul>
      {showModal && (
        <Modal largeImg={imageLargeSrc} toggleModal={toggleModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && images.length < totalResult && !loading && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string,
};
