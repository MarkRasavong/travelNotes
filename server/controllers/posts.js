import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        //LIMIT = number of posts per page;
        const LIMIT = 8;
        //Bookmarks where is left off depending on what page# is at.
        const startIndex = (Number(page) - 1 ) * LIMIT;

        //counts all available posts
        const total = await PostMessage.countDocuments({});
        // find all docuements and sort them by recent order and limit each page by LIMIT and skip to the next with where it's left off (startIndex)
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    //everything is the same minus the creator. previously we had to manually input that in the Form. 
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    //check if user is autheticated / populate req.userid from our auth instance under routes
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    // each like is assigned to a user's id and find it
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        //to like a post with
        post.likes.push(req.userId);
    } else {
        //to dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // 2nd + 3rd arg => create a new post, 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // to be sent back to the server --> mongoDB has the key _id
    const updatedPost = { creator, title, message, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        //title search is not case sensitive and searches for any title with the word/name withour consideration of case.

        const posts = await PostMessage.find({ $or: [ { title } ]});
        //In our DB find a post containing the title (regardless of casing) or any tags within our array of tags in our DB.

        res.json({ data: posts });
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


export default router;