import { FETCH_ALL, CREATE } from '../constants/actionTypes';

export default (notes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...notes, action.payload];
    default:
      return notes;
  }
};