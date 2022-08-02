import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ close, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        close();
      }
    });

    return window.removeEventListener('keydown', event => {
      if (event.code === 'Escape') {
        close();
      }
    });
  }, [close]);

  const handleClickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      close();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleClickOnOverlay}>
      <div className={styles.Modal}>
        <img
          className={styles.modalImg}
          src={largeImageURL}
          alt="краса"
          onClick={close}
        />
      </div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  close: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
