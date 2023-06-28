import mongoose from 'mongoose'
import config from '../../config.js'


const URI_MONGO = config.uri_mongo
mongoose.set('strictQuery', true)

try {
  await mongoose.connect(URI_MONGO)
  console.log('Conectado a Mongo DB')
} catch (error) {
  console.log(error)
}





