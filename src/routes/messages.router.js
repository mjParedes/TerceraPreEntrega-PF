import { Router } from "express";
import { transporter } from "../messages/nodemailer.js";
import { client } from '../messages/twilio.js'
import config from '../config.js'


const router = Router()

router.get('/', async (req, res) => {
    const messageOptions = {
        from: 'CODER NODEMAILER',
        to: 'tutecapo1985@gmail.com',
        subject: 'Prueba Nodemailer',
        // text: 'Hola a todos desde nodemailer',
        html: '<h2>This is a message generate by Nodemailer.</h2>'
    }
    try {
        await transporter.sendMail(messageOptions)
        res.send('MAIL SEND')
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { nombre, apellido, email, frase } = req.body
    const messageOptions = {
        from: 'CODER NODEMAILER',
        to: email,
        subject: `BIENVENIDO ${nombre} ${apellido}`,
        html: `<h2>${nombre} ${apellido}, eres el primer usuario de esta aplicacion.</h2>`
    }

    try {
        await transporter.sendMail(messageOptions)
        res.send('EMAIL SEND')
    } catch (error) {
        console.log(error)
    }
})

router.get('/sms', async (req, res) => {
    const smsOptions = {
        body: 'Probando twilio',
        from: config.twilio_phone_number,
        to: '+54 11 6883 0014'
    }
    try {
        await client.messages.create(smsOptions)
        res.send('SMS SEND')
    } catch (error) {
        console.log(error)
    }
})


export default router


