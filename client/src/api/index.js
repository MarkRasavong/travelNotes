import axios from 'axios';


const url = 'http://localhost:5000/notes';

export const createNote = newNote => axios.post(url, newNote);
export const fetchNotes = () => axios.get(url);
