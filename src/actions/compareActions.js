export const UPDATE_FIRST = 'UPDATE_FIRST';
export const UPDATE_SECOND = 'UPDATE_SECOND';
export const CLEAR_POKEMONS = 'CLEAR_POKEMONS';


export const updateFirst = (pokemon) => {
  return { 
    type: UPDATE_FIRST,
    payload: pokemon
  }
};

export const updateSecond = (pokemon) => {
  return { 
  type: UPDATE_SECOND,
  payload: pokemon
  }
};

export const clearPokemons = () =>{
  return{
  type: CLEAR_POKEMONS
  }
};