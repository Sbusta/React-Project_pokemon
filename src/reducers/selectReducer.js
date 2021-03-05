import {UPDATE_POKEMON, CLEAR_POKEMON} from '../actions/selectActions'

const initialState = {
    pokemon: {

    }
}

function selectReducer (state = initialState, action){
    switch (action.type) {
        case UPDATE_POKEMON:
            return {
                pokemon: action.payload
            }

        case CLEAR_POKEMON:
            return{
                initialState
            }

        default:
            return state
    }
}

export default selectReducer;