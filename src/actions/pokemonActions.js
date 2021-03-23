import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {API_URL} from '../utils'

export const filter = createAction('pokeApp/search');

const getPokemons = (page) =>{
  let off = page * 20;
  let lim = 20;
  let pokemons = fetch(API_URL + '?offset=' + off + '&limit=' + lim)
                 .then(response => response.json());
  
  
  return pokemons;
};

export const fetchPokemons = createAsyncThunk(
  'pokeapp/pokemons',
  async (page, thunkAPI) => {
    const response = await getPokemons(page);
    return response.results;
  }
);
