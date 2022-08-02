import { Grid } from 'react-loader-spinner';
import styles from './Loader.module.css';
export const Loader = () => {
  return (
    <Grid className={styles.Loader} color="#00BFFF" height={80} width={80} />
  );
};
