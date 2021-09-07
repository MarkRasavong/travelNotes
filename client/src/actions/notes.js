import { FETCH_ALL, CREATE, DELETE_NOTE, UPDATE_NOTE, LIKE_POST } from '../constants/actionTypes';

import * as api from '../api';

export const getNotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchNotes();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const createNote = (note) => async (dispatch) => {
  try {
    const { data } = await api.createNote(note);

    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await api.deleteNote(id);

    dispatch({ type: DELETE_NOTE, payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const updateNote = (id, note) => async (dispatch) => {
  try {
    const { data } = await api.updateNote(id, note);

    dispatch({ type: UPDATE_NOTE, payload: data });
  } catch (err) {
    console.log(err)
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};