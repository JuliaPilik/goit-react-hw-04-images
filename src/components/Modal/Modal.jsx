import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({largeImg, toggleModal})  {
    const closeModalByEsc = e => {
    if (e.code === 'Escape') {
      toggleModal();
      }
    };
    useEffect(() => {
     document.addEventListener('keydown', closeModalByEsc);
  }, [closeModalByEsc]);

    useEffect(() => {

    return () => {
       document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [closeModalByEsc]);



    return (
      <div
        className={css.Modal__backdrop}
        onClick={() => toggleModal()}
      >
        <div className={css.Modal__content} OnClick={e => e.stopPropagation()}>
          <img src={largeImg} alt="" className={css.Modal__img} />
        </div>
      </div>
    );
}


Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
