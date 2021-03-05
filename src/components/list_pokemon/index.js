
import React, { useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux'
import styles from './list.module.css';
import useElementOnScreen from './useElementOnScreen';
import pokerun from './running-Jolteon.gif';
import Pokemon from './pokemon';


const PokeList = (props) =>{
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [ containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    useEffect(()=>{
        if(isVisible && props.search.search === ''){  
            savePokemons(page, pokemons);
            setPage(page+1);
        }

    }, [isVisible]);

    const savePokemons = (page, prev) => {
        getPokemons(page)
        .then((pokemonList) => prev.concat(pokemonList))
        .then((pokemonList) => setPokemons(pokemonList));
    }

    const getPokemons = (page) => {
        let off = page*20;
        let lim = 20;
        var pokes =  fetch('https://pokeapi.co/api/v2/pokemon/?'+'offset='+off+'&limit='+lim)
            .then(res => res.json())
            .then(pokemons => pokemons.results);
        
        return pokes;
    }
 
    const filter= (pokemon) =>{
        if(props.search.search === '' || pokemon.name.includes(props.search.search)){
            return(
                <Pokemon key={pokemon.name} pokeUrl = {pokemon.url} display={true}/>
            );
        }else{
            return(
                <Pokemon key={pokemon.name} pokeUrl = {pokemon.url} display={false}/>
            );
        }
    }
    return(
        <div className={styles.pokemonList}>

            {Object.keys(props.compare.first).length !== 0 ?
            <span className={styles.selected}>
                {props.compare.first.name.toUpperCase()}
            </span>
            :
            null}
            {pokemons.map(filter)}
            <div ref={containerRef}>
                <img className={styles.pokemonImg} src={pokerun} alt='Loading...'></img>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
        compare: state.compare
    }
}



export default connect(mapStateToProps)(PokeList);