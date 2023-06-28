import UsersDBDTO from "../../DTOs/usersDB.dto.js";
import UsersResponseDTO from "../../DTOs/usersResponse.dto.js";
import { usersModel } from "../models/users.model.js";

export default class UsersManager {

    async getUsers(email,password) {
        try {
            const users = await usersModel.find({email:email,password:password})
            return users
        } catch (error) {
            return error
        }
    }

    async getUserById(id) {
        try {
            const user = await usersModel.findById(id)
            const userDBDTO = new UsersDBDTO(user)
            return userDBDTO
        } catch (error) {
            return error
        }
    }

    async addUser(obj) {
        try {
            const userDBDTO = new UsersDBDTO(obj)
            console.log(userDBDTO)
            const newUser = await usersModel.create(userDBDTO)
            const userRespDTO = new UsersResponseDTO(newUser)
            return userRespDTO
        } catch (error) {
            return error
        }
    }

    async updateUser(id, obj) {
        try {
            const updatedUser = await usersModel.findByIdAndUpdate(id, obj)
            return updatedUser
        } catch (error) {
            return error
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await usersModel.findByIdAndDelete(id)
            return `Usuario ${deletedUser.email}, eliminado con exito`
        } catch (error) {
            return error
        }
    }

    async deleteAll(){
        try {
            const allUsers = await usersModel.deleteMany()
            return allUsers
        } catch (error) {
            return error
        }
    }
}

