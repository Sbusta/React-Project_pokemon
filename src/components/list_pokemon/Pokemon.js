import React, { useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux'
import styles from './list.module.css';
import loadingGif from './pikachu_run.gif';
import {fetchPokemon} from '../../actions/selectActions';
import {updateSecond} from '../../actions/compareActions';
import {IMAGE_URL} from '../../utils'

const Pokemon = (props) =>{
  const [loading, setLoading] = useState(true);
  //const imgUrl = '${IMAGE_URL} ${props.number}.png';
  const imgUrl = IMAGE_URL + props.number + '.png';
  const dispatch = useDispatch();

  const selectPokemon = () =>{
    dispatch(fetchPokemon(props.pokeUrl));
  };
  
  return(
    <span>
      <span className={props.display ? styles.pokemonCard: styles.hidden} onClick={selectPokemon}>
        <img className={styles.pokemonImg} alt={props.name} src={loading ? loadingGif : imgUrl} onLoad={()=>setLoading(false)}></img>
        <span className={styles.pokemonName}>{props.name.toUpperCase()}</span>
      </span>
    </span>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state,
    compare: state.compare
  }
};
const mapDispatchToProps = (dispatch) => {
  return{
    updateSecond: (pokemon) => dispatch(updateSecond(pokemon))
  }
};

export default connect(mapStateToProps,
             mapDispatchToProps)
             (Pokemon);