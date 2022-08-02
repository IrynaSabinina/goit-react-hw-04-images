import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { mapper } from 'utils/mapper';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { api } from 'API/api';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    totalImg: 0,
    page: 1,
    perPage: 12,
    isShown: false,
    search: '',
    modalImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search && this.state.search !== '') {
      this.fetchImages();
      return;
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    this.setState({ loading: true });
    api(this.state.search, this.state.page)
      .then(({ data }) => {
        this.setState(prevs => ({
          images: [...prevs.images, ...mapper(data.hits)],
          totalImg: data.total,
        }));
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleModalImg = modalImg => {
    this.setState({ modalImg: modalImg });
  };
  handleModalClose = () => {
    this.setState({ modalImg: null });
  };

  handleFormSubmit = search => {
    if (search === this.state.search) {
      return;
    } else {
      this.setState({ search: search, images: [], isShown: true, page: 1 });
    }
  };

  handlerLoadMore = () => {
    this.setState(ps => ({ page: ps.page + 1 }));
  };

  render() {
    const { images, modalImg, isShown, loading, totalImg } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}

        {isShown && (
          <>
            <ImageGallery
              handleModalImg={this.handleModalImg}
              images={images}
            />
            {totalImg > 12 && (
              <Button textContent="Load More" onClick={this.handlerLoadMore} />
            )}
            {loading && <Loader />}
          </>
        )}
        {modalImg && (
          <Modal largeImageURL={modalImg} close={this.handleModalClose} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
