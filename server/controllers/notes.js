import express from 'express';
import mongoose from 'mongoose';
import notes from '../../client/src/reducers/notes.js';

import NoteMessage from '../models/noteMessage.js';

const router = express.Router();

export const getNotes = async (req, res) => { 
    try {
        const noteMessages = await NoteMessage.find();
                
        res.status(200).json(noteMessages);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createNote = async (req, res) => {
    const note = req.body;

    //everything is the same minus the creator. previously we had to manually input that in the Form. 
    const newNoteMessage = new NoteMessage({...note, creator: req.userId, createdAt: new Date().toISOString()})

    try {
        await newNoteMessage.save();

        res.status(201).json(newNoteMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with the id : ${id}`);
    await NoteMessage.findByIdAndRemove(id, res);

    res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    //check if user is autheticated / populate req.userid from our auth instance under routes
    if(!req.userId) return res.json({ message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with the id: ${id}`);

    const note = await NoteMessage.findById(id);
    // each like is assigned to a user's id and find it
    const index = note.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        //to like a post with
        note.likes.push(req.userId);
    } else {
        //to dislike
      note.likes = note.likes.filter((id) => id !== String(req.userId));
    }

    // 2nd + 3rd arg => create a new note, 
    const updatedPost = await NoteMessage.findByIdAndUpdate(id, note, { new: true });

    res.json(updatedPost);
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with the id: ${id}`);

    // to be sent back to the server --> mongoDB has the key _id
    const updatedNote = { creator, title, message, tags, selectedFile, _id: id };

    await NoteMessage.findByIdAndUpdate(id, updatedNote, { new: true });

    res.json(updatedNote);
}

export default router;