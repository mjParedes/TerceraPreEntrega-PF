import { chatsModel } from "../models/chats.model.js";


export default class ChatManager {
    async getAllChats() {
        try {
            const messages = await chatsModel.find()
            return messages
        } catch (error) {
            console.log(error)
        }
    }

    async addChat(objChat) {
        try {
            const newChat = await chatsModel.create(objChat)
            return newChat
        } catch (error) {
            console.log(error)
        }
    }
}


