import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (search.trim() === '') {
      return toast.error('заполните поле поиска');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.Button}></button>
        <input
          className={styles.Input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
