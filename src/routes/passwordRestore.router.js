import { Router } from "express";
import { getUserById } from "moongose/controller/user_controller";
import { transporter } from "../messages/nodemailer";

const router = Router()

router.post('/', async (req, res) => {
    const {email}= req.body
    try {
        const user = await getUserById(email)
        if(!user){
            res.status(200).json({message:'Usuario no encontrado'})
        } else {
            
        }
    } catch (error) {
        console.log(error)
    }
})


export default router


