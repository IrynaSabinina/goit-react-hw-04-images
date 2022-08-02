import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handClickDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handClickDown);
  }

  handClickDown = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };

  handleClickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.close();
    }
  };

  render() {
    const { largeImageURL, close } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleClickOnOverlay}>
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
  }
}
