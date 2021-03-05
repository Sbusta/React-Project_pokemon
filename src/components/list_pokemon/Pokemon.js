import React, { useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux'
import styles from './list.module.css';
import pokeball from './running-Jolteon.gif';
import {updatePokemon} from '../../actions/selectActions';
import {updateSecond} from '../../actions/compareActions';

const Pokemon = (props) =>{
    const [pokemon, setPokemon] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(()=>{
        async function fetchData(){
            setIsLoaded(false);
            await fetch(props.pokeUrl)
            .then(res => res.json())
            .then(pokemon => setPokemon({pokemon}));
            setIsLoaded(true);
        }
        fetchData();
    }, []);

    const handleClick = () =>{
        if(Object.keys(props.compare.first).length === 0){
            props.updatePokemon(pokemon);
        }else{
            props.updateSecond(pokemon.pokemon);
        }
    }
    return(
        <span>
            { isLoaded ?
            <span className={props.display ? styles.pokemonCard: styles.hidden} onClick={handleClick}>  
                <img className={styles.pokemonImg} alt={pokemon.pokemon.name} src={pokemon.pokemon.sprites['front_default']}></img>
                <span className={styles.pokemonName}>{pokemon.pokemon.name.toUpperCase()}</span>
            </span>
            :
            <span className={styles.pokemonCard}>  
                <img className={styles.pokemonImg} src={pokeball} alt='Loading...'></img>
                <span className={styles.pokemonName}>Loading...</span>
            </span>
            }
        </span>
    )
}
const mapStateToProps = (state) => {
    return {
        search: state,
        compare: state.compare
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updatePokemon: (pokemon) => dispatch(updatePokemon(pokemon)),
        updateSecond: (pokemon) => dispatch(updateSecond(pokemon))
    }
}
export default connect(mapStateToProps,
                       mapDispatchToProps)
                       (Pokemon);