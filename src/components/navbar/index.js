import styles from './navegationbar.module.css';
import {updateSearch} from '../../actions/searchActions';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        search: state.search
    };
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateSearch: (search) => dispatch(updateSearch(search))
    };
}

const Navbar = (props) =>{
    const handlerChange = (e) => {
        props.updateSearch(e.target.value);
    }
    return(
    <nav className={styles.navBar}>
        <span>
            <a href='/' className={styles.title}>ThePokéApp</a>
        </span>
        <span className={styles.navContainer}>
            <a href='pokemons' className={styles.navLink}>Pokemons</a>
        </span>
        <span>
            <input type='text' placeholder='Search' className={styles.navSearch} onChange={handlerChange}></input>
        </span>
    </nav>);
    
}

export default connect(mapStateToProps,
                       mapDispatchToProps)
                       (Navbar);