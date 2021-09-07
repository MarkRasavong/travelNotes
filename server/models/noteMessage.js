import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var NoteMessage = mongoose.model('NoteMessage', noteSchema);

export default NoteMessage;