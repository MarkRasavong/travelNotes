
import { FETCH_ALL, CREATE, LIKE_POST, DELETE_NOTE, UPDATE_NOTE } from '../constants/actionTypes.js';

export default (notes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE_POST:
      return notes.map((note) => (note._id === action.payload._id ? action.payload : note));
    case CREATE:
      return [...notes, action.payload];
    case UPDATE_NOTE:
      return notes.map((note) => (note._id === action.payload._id ? action.payload : note));
    case DELETE_NOTE:
      return notes.filter((note) => note._id !== action.payload);
    default:
      return notes;
  }
};