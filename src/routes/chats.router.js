import { Router } from "express";
import { chatsModel} from '../persistencia/DAOs/models/chats.model.js'

const router = Router()

router.get('/', async(req,res)=>{
    res.render('chat',{})
})

router.get('/showChats', async(req,res)=>{
    try {
        const chats = await chatsModel.find()
        res.send(chats)
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async(req,res)=>{
    const chat= req.body
    const response = await chatsModel.create(chat)
    res.send(response)
})

export default router

