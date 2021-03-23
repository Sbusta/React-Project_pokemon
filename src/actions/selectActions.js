
import {createAsyncThunk, createAction} from '@reduxjs/toolkit';

export const closePokemon = createAction('select/close');

const getPokemon = (url) =>{
  let pokemons = fetch(url)
           .then(response => response.json());
  return pokemons
};

export const fetchPokemon = createAsyncThunk(
  'pokeapp/pokemon',
  async (url, thunkAPI) => {
    const pokemon = await getPokemon(url);
    const description = await getPokemon(pokemon.species.url);
    return [pokemon, description];
  }
);