import {fetchPokemon, closePokemon} from '../actions/selectActions';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  pokemon: {

  },
  description:{

  }
};

const selectReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(fetchPokemon.fulfilled, (state,action) =>{
      return state = {
        pokemon: action.payload[0],
        description: action.payload[1]
      }
    })
    .addCase(closePokemon, (state,action) =>{
      return state = {
        pokemon:{
          
        },
        description:{

        }
      }
    });

});

export default selectReducer;