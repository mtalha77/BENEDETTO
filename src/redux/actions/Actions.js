import * as types from './types';

export const addToLiked = data => {
  return {
    type: types.ADD_TO_LIKED,
    payload: data,
  };
};

export const removeFromLiked = data => {
  return {
    type: types.REMOVE_FROM_LIKED,
    payload: data,
  };
};

export const deleteReduxData = () => {
  return {
    type: types.DELETE_REDUX_DATA,
  };
};
