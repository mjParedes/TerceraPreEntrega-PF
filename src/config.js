import dotenv from 'dotenv'

dotenv.config()

const object = {
    port: process.env.PORT,
    uri_mongo: process.env.URI_MONGO,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
}


export default object


