import express from 'express';
import mongoose from 'mongoose';

import NoteMessage from '../models/noteMessage.js';

const router = express.Router();

export const getNotes = async (req, res) => { 
    try {
        const noteMessages = await NoteMessage.find();
                
        res.status(200).json(noteMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newNoteMessage = new NoteMessage({ title, message, selectedFile, creator, tags })

    try {
        await newNoteMessage.save();

        res.status(201).json(newNoteMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export default router;