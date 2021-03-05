import {connect} from 'react-redux'
import styles from './details.module.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
import {clearPokemon} from '../../actions/selectActions';
import {updateFirst} from '../../actions/compareActions';
import React, { useState, useEffect} from 'react';

const PokeDetails = (props) =>{
    const pokemon = props.select.pokemon ? props.select.pokemon.pokemon: null;
    const [description, setDescription] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const bgClick = (e) => {
        props.clearPokemon();
    }
    const wClick = (e) =>{
        e.stopPropagation();
    }

    useEffect(()=>{
        if(pokemon){
        async function fetchData(){
            setIsLoaded(false);
            await fetch(pokemon.species.url)
            .then(res => res.json())
            .then(description => setDescription(description));
            setIsLoaded(true);
        }
        fetchData();
        }
    }, [pokemon]);

    const getGender = () =>{
        var gender = Math.floor(Math.random() * 9) - 1;
        if(gender > 4){
            return 'Female';
        }else if(gender > -1){
            return 'Male';
        }
        return 'Genderless';
    }

    const getDescription = () => {
        var obj = description.['flavor_text_entries'].find(element => element.language.name === 'en');
        return obj['flavor_text'].replace('','');
    }

    const getData = () =>{
        var data = [
            {
                name: "HP",
                value: pokemon.stats[0]['base_stat']
            },
            {
                name: "Attack",
                value: pokemon.stats[1]['base_stat']
            },
            {
                name: "Defense",
                value: pokemon.stats[2]['base_stat']
            },
            {
                name: "Sp. Atk",
                value: pokemon.stats[3]['base_stat']
            },
            {
                name: "Sp. Def",
                value: pokemon.stats[4]['base_stat']
            },
            {
                name: "Speed",
                value: pokemon.stats[5]['base_stat']
            },
        ];
        return data;
    }

    const compare = () =>{
        props.updateFirst(pokemon);
        props.clearPokemon();
    }

    return (
        
        <div>
            {pokemon && Object.keys(pokemon).length !== 0 ?
            <div className={styles.detailsBackground} onClick={bgClick}>
                <div className={styles.detailsWindow} onClick={wClick}>
                    <div className={styles.detailsHeader}>
                        <span>
                            {pokemon.name.toUpperCase()}
                        </span>
                        <button className={styles.compareButton} onClick={compare}>
                            compare to...
                        </button>
                        <button className={styles.closeButton} onClick={bgClick}>
                            x
                        </button>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailsPokemon}>
                            <div>
                                <img className={styles.pokemonImg} alt={pokemon.name} src={pokemon.sprites['front_default']}></img>
                            </div>
                            <div className={styles.pokemonContainer}>
                                <div className={styles.pokemonText}>
                                    {isLoaded ? getDescription() : null}
                                    <hr></hr>
                                </div>
                                <div className={styles.pokemonCharacteristics}>
                                    <span className={styles.characteristic}>
                                        <span className={styles.characteristicTitle}>
                                            Heigth
                                        </span>
                                        <span className={styles.pokemonText}>
                                            {pokemon.height/10} m
                                        </span>
                                    </span>
                                    <span className={styles.characteristic}>
                                        <span className={styles.characteristicTitle}>
                                            Weight
                                        </span>
                                        <span className={styles.pokemonText}>
                                            {pokemon.weight/10} kg
                                        </span>
                                    </span>
                                    <span className={styles.characteristic}>
                                        <span className={styles.characteristicTitle}>
                                            Gender
                                        </span>
                                        <span className={styles.pokemonText}>
                                            {getGender()}
                                        </span>
                                    </span>

                                    <span className={styles.characteristicList}>
                                        <span className={styles.characteristicTitle}>
                                            Abilities
                                        </span >
                                        <ul className={styles.pokemonText}>
                                            {pokemon.abilities.map((ability) => (
                                                <li key={ability.slot}>
                                                    {ability.ability.name}
                                                </li>)
                                            )}
                                        </ul>
                                    </span>

                                    <span className={styles.characteristicList}>
                                        <span className={styles.characteristicTitle}>
                                            Type
                                        </span>
                                        <ul className={styles.pokemonText}>
                                            {pokemon.types.map((type) => (
                                                <li key={type.slot}>
                                                    {type.type.name}
                                                </li>)
                                            )}
                                        </ul>
                                    </span>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className={styles.detailsStats}>
                            <hr></hr>
                            <ResponsiveContainer width="100%" height="100%">
                            <BarChart

                                data={getData()}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                    
                </div>
            </div>
            : null}
        </div>
    )    
}

const mapStateToProps = (state) => {
    return {
        select: state.select,
        compare: state.compare
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearPokemon: () => dispatch(clearPokemon()),
        updateFirst: (pokemon) => dispatch(updateFirst(pokemon))
    }
}
export default connect(mapStateToProps,
                       mapDispatchToProps)
                       (PokeDetails);