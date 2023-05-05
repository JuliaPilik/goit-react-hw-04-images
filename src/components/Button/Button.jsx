import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <div className={css.Load_more}>
      <button onClick={() => onClick()} className={css.Button}>
        Load More
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
