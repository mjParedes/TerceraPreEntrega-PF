import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    uri_mongo: process.env.URI_MONGO,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
    twilio_sid: process.env.TWILIO_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    node_env: process.env.NODE_ENV,
    jwt_key: process.env.JWT_KEY
}







