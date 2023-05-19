import mongoose from 'mongoose'
import config from '../../config.js'


const URI_MONGO = config.uri_mongo

try{
  await mongoose.connect(URI_MONGO)
  console.log('Conectando a la base de datos')
} catch (error) {
  console.log(error)
}



