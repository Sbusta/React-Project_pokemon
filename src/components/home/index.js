import loading from './getting_ready.gif';
import styles from './home.module.css';

const Welcome = () => {
  return(
    <div className={styles.welcomeContainer}>
    <h1>Welcome to PokéApp</h1>
    <img className={styles.loadGif} src={loading} alt='Loading'></img>
    </div>
  );
};

export default Welcome;