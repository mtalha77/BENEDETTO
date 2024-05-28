import * as types from '../actions/types';

const initialState = {
  liked: [],
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_LIKED:
      return {
        liked: [...state.liked, action.payload],
      };
    case types.REMOVE_FROM_LIKED:
      return {
        liked: state.liked.filter(f => f !== action.payload),
      };
    case types.DELETE_REDUX_DATA:
      return {
        liked: [],
      };
    default:
      return state;
  }
};
