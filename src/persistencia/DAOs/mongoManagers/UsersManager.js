import UsersDBDTO from "../../DTOs/usersDB.dto.js";
import UsersResponseDTO from "../../DTOs/usersResponse.dto.js";
import { usersModel } from "../models/users.model.js";

export default class UsersManager{
    async getAllUsers(){
        try {
            const users = await usersModel.find()
            return users             
        } catch (error) {
            console.log(error)
        }
    }
    async createAUser(objUser){
        try {
            const userDBDTO= new UsersDBDTO(objUser)
            console.log(userDBDTO)
            const newUser = await usersModel.create(userDBDTO)
            const userRespDTO = new UsersResponseDTO(newUser)
            return userRespDTO
        } catch (error) {
            console.log(error)
        }
    }
    async updateAUser(id,objUser) {
        try {
            const updatedUser = await usersModel.findByIdAndUpdate(id,objUser)
            return updatedUser
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAUser(id) {
        try {
            const deletedUser= await usersModel.findByIdAndDelete(id)
            return `Usuario ${deletedUser.email}, eliminado con exito`
        } catch (error) {
            console.log(error)
        }
    }
}

