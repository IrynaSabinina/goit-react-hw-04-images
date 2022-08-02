import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ textContent, onClick }) => {
  return (
    <button className={styles.Button} type="button" onClick={onClick}>
      {textContent}
    </button>
  );
};

Button.propTypes = {
  textContent: PropTypes.string,
  onClick: PropTypes.func,
};
