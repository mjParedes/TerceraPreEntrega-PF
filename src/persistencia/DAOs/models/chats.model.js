import mongoose from "mongoose";


const chatsSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    message: {
        type: String,
    }
})

export const chatsModel = mongoose.model('Chats', chatsSchema)
