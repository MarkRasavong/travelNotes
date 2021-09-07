  
import express from 'express';

import { getNotes, createNote, deleteNote, updateNote, likePost } from '../controllers/notes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//auth in areas that only a user can do not one that is not registered

router.get('/', getNotes);
router.post('/', auth, createNote);
router.delete('/:id', auth, deleteNote);
router.patch('/:id', auth, updateNote);
router.patch('/:id/likePost', auth, likePost);

export default router;