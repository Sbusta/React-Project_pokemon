import styles from './navegationbar.module.css';
import {connect, useDispatch} from 'react-redux';
import {updateSearch} from '../../actions/searchActions';
import { Link } from 'react-router-dom';
import {filter} from '../../actions/pokemonActions'
const Navbar = (props) =>{
  const dispatch = useDispatch();

  const filterUpdate = (event) => {
    props.updateSearch(event.target.value.toLowerCase());
    dispatch(filter(event.target.value.toLowerCase()))
  }

  return(
  <nav className={styles.navBar}>
    <span>
      <Link to='/' className={styles.title}>PokéApp</Link>
    </span>
    <span className={styles.navContainer}>
      <Link to='pokemons' className={styles.navLink}>Pokemon</Link>
      <Link to='items' className={styles.navLink}>Items</Link>11
    </span>
    <span>
      <input type='text' placeholder='Search' className={styles.navSearch} onChange={filterUpdate}></input>
    </span>
  </nav>);
};

const mapStateToProps = (state) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    updateSearch: (search) => dispatch(updateSearch(search))
  };
};


export default connect(mapStateToProps,
             mapDispatchToProps)
             (Navbar);