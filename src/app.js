//? Dependecias
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors'
// import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo'
//? Passport
import passport from 'passport';
//? Customize 
import { __dirname } from './utils.js';
import './persistencia/DAOs/dbConfig.js'
//? Routes
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatsRouter from './routes/chats.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import messagesRouter from './routes/messages.router.js'
import './passport/passportStrategies.js'
import config from './config.js'


const app = express()

//?  Seteo de aplicacion
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(cors())


//? Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


//? Mongo session
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.uri_mongo
        }),
        resave: false,
        saveUninitialized: false,
        secret: 'sessionKey',
        cookie: { max: 60000 }
    }))

//? Passport setup
// Inicializar 
app.use(passport.initialize())
// Passport guardara info de session
app.use(passport.session())


//? Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chats', chatsRouter)
app.use('/api/views', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/messages', messagesRouter)


//? Ruta raiz
app.get('/', (req, res) => {
    res.redirect('/api/views/login')
})


//? Rutas inexistentes
app.all("*", (req, res) => {
    // res.status(404).json({"error": "ruta no existente"})
    res.send(`<h2>Pagina no encontrada</h2> <button onclick="location.href='/api/views/login'">Ir a login</button>`)
  });



const PORT = config.port

// app.listen(PORT, () => {
//     console.log(`Escuchando puerto ${PORT} => http://localhost:8080`)
// })


//? Sockets
const mensajes = []

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT} => http://localhost:8080`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    socket.on('mensaje', info => {
        mensajes.push(info)
        socketServer.emit('chat', mensajes)
        async function addMsg() {
            try {
                const newMsg = await messagesModel.create(info)
                return newMsg
            } catch (error) {
                console.log(error)
            }
        }
        addMsg()
        console.log(info)
    })

    socket.on('nuevoUsuario', usuario => {
        socket.broadcast.emit('broadcast', usuario)
    })
})














