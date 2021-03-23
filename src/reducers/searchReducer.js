import {UPDATE_SEARCH} from '../actions/searchActions'

const initialState = {
  search: ''
};

function searchReducer (state = initialState, action){
  switch (action.type) {
    case UPDATE_SEARCH:
      return {
        search: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;