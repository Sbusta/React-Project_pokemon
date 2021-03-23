import searchReducer from './reducers/searchReducer';
import compareReducer from './reducers/compareReducer';
import selectReducer from './reducers/selectReducer';
import pokemonReducer from './reducers/pokemonReducer';
import {configureStore} from '@reduxjs/toolkit';

const reducer = {
    search: searchReducer,
    compare: compareReducer,
    select: selectReducer,
    pokemons: pokemonReducer
};

const store = configureStore({reducer});

export default store;