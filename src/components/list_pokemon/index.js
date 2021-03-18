
import React, { useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux'
import styles from './list.module.css';
import useElementOnScreen from './useElementOnScreen';
import pokerun from './running-Jolteon.gif';
import Pokemon from './Pokemon';

const PokeList = (props) => {
  const pokemons = props.pokemons.filteredPokemons;
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [ containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });
  
  useEffect(() => {
    if(isVisible && props.search.search === ''){  
      dispatch(fetchPokemons(page))
      setPage(page + 1);
    };

  }, [isVisible]);
  
  return(
    <div className={styles.pokemonList}>
      {Object.keys(props.compare.first).length !== 0 ?
      <span className={styles.selected}>
        {props.compare.first.name.toUpperCase()}
      </span>
      :
      null}
      {pokemons ? pokemons.map(pokemon =>
      <Pokemon key={pokemon.name} pokeUrl = {pokemon.url} number={props.pokemons.pokemons.indexOf(pokemon) + 1} name={pokemon.name} display={true}/> )
      : null}
      <div ref={containerRef}>
        <img className={styles.pokemonImg} src={pokerun} alt='Loading...'></img>
      </div>
    </div>
  );
};
  
const mapStateToProps = (state) => {
  return {
    search: state.search,
    compare: state.compare,
    pokemons: state.pokemons,
    selected: state.select
  };
};

export default connect(mapStateToProps)(PokeList);