import {fetchPokemons, filter} from '../actions/pokemonActions';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
  filteredPokemons:[]
};

const pokemonReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(fetchPokemons.fulfilled, (state, action) => {
      let pokemons = state.pokemons.concat(action.payload);
      return state = {
        pokemons: pokemons,
        filteredPokemons: pokemons
      }
    })
    .addCase(filter, (state, action) =>{
      let filtered = state.pokemons.filter(pokemon=> pokemon.name.includes(action.payload))
      return state = {
        ...state,
        filteredPokemons: filtered
      }
    })
});

export default pokemonReducer;