import {UPDATE_FIRST, UPDATE_SECOND, CLEAR_POKEMONS} from '../actions/compareActions'

const initialState = {
  first: {

  },
  second:{

  }
};

function compareReducer (state = initialState, action){
  switch (action.type) {
    case UPDATE_FIRST:
      return {
        ...state,
        first: action.payload
      };
      
    case UPDATE_SECOND:
      return {
        ...state,
        second: action.payload
      };

    case CLEAR_POKEMONS:
      return{
        first: {

        },
        second:{
      
        }
      };

    default:
      return state;
  }
};

export default compareReducer;