import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { mapper } from 'utils/mapper';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { api } from 'API/api';
import { Button } from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalImg, setTotalImg] = useState(0);
  const [page, setPage] = useState(1);

  const [isShown, setIsShown] = useState(false);
  const [search, setSearch] = useState('');
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoading(true);
    api(search, page)
      .then(({ data }) => {
        setImages(ps => [...ps, ...mapper(data.hits)]);
        setTotalImg(data.total);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  const handleModalImg = modalImg => {
    setModalImg(modalImg);
  };
  const handleModalClose = () => {
    setModalImg(null);
  };

  const handleFormSubmit = searchNow => {
    if (search === searchNow) {
      return;
    } else {
      setSearch(searchNow);
      setImages([]);
      setIsShown(true);
      setPage(1);
    }
  };

  const handlerLoadMore = () => {
    setPage(ps => ps + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}

      {isShown && (
        <>
          <ImageGallery handleModalImg={handleModalImg} images={images} />
          {totalImg > 12 && (
            <Button textContent="Load More" onClick={handlerLoadMore} />
          )}
          {loading && <Loader />}
        </>
      )}
      {modalImg && <Modal largeImageURL={modalImg} close={handleModalClose} />}
      <ToastContainer />
    </div>
  );
};
