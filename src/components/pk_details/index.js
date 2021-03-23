import {connect, useDispatch} from 'react-redux';
import styles from './details.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
  } from 'recharts';
import {closePokemon} from '../../actions/selectActions';
import {updateFirst, updateSecond} from '../../actions/compareActions';
import React, {useEffect} from 'react';

const PokeDetails = (props) =>{
  const pokemon = Object.keys(props.select.pokemon).length !== 0 ? props.select.pokemon: null;
  const description = Object.keys(props.select.pokemon).length !== 0 ? props.select.description: null;
  const dispatch = useDispatch();
  const closeDetailsWindow = (event) => {
    dispatch(closePokemon());
  };

  const stopWindowPropagation = (event) =>{
    event.stopPropagation();
  };

  useEffect(()=>{
    if(Object.keys(props.compare.first).length !== 0 && pokemon){
      props.updateSecond(pokemon);
      dispatch(closePokemon());
    }
  }, [pokemon]);

  const getGender = () =>{
    let gender = Math.floor(Math.random() * 9) - 1;
    if(gender > 4){
      return 'Female';
    }else if(gender > -1){
      return 'Male';
    }
    return 'Genderless';
  };

  const getDescription = () => {
    let obj = description.['flavor_text_entries'].find(element => element.language.name === 'en');
    return obj['flavor_text'].replace('','');
  };

  const getData = () =>{
    let data = [
      {
        name: 'HP',
        value: pokemon.stats[0]['base_stat']
      },
      {
        name: 'Attack',
        value: pokemon.stats[1]['base_stat']
      },
      {
        name: 'Defense',
        value: pokemon.stats[2]['base_stat']
      },
      {
        name: 'Sp. Atk',
        value: pokemon.stats[3]['base_stat']
      },
      {
        name: 'Sp. Def',
        value: pokemon.stats[4]['base_stat']
      },
      {
        name: 'Speed',
        value: pokemon.stats[5]['base_stat']
      },
    ];
    return data;
  };

  const compare = () =>{
    props.updateFirst(pokemon);
    dispatch(closePokemon());
  };

  return (
    <div>
      {Object.keys(props.compare.first).length === 0 && pokemon ?
      <div className={styles.detailsBackground} onClick={closeDetailsWindow}>
        <div className={styles.detailsWindow} onClick={stopWindowPropagation}>
          <div className={styles.detailsHeader}>
            <span>
              {pokemon.name.toUpperCase()}
            </span>
            <button className={styles.compareButton} onClick={compare}>
              compare to...
            </button>
            <button className={styles.closeButton} onClick={closeDetailsWindow}>
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
                  {getDescription()}
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
  ); 
};

const mapStateToProps = (state) => {
  return {
    select: state.select,
    compare: state.compare
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    updateFirst: (pokemon) => dispatch(updateFirst(pokemon)),
    updateSecond: (pokemon) => dispatch(updateSecond(pokemon))
  }
};

export default connect(mapStateToProps,
             mapDispatchToProps)
             (PokeDetails);