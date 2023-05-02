import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    full_name: {
        type: String
    },
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: false,
    },
    password:{
        type: String,
        required: true,
    },
    cart:{
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Carts'
    },
    role: {
        type: String,
        default:'usuario'
    }
})

export const usersModel = mongoose.model('Users', usersSchema)