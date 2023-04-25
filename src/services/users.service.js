import UsersManager from "../persistencia/DAOs/mongoManagers/UsersManager.js";

const usersManager = new UsersManager()

export async function getAll(){
    try {
        const users = await usersManager.getAllUsers()
        return users        
    } catch (error) {
        return error
    }
}

export async function createUser(objUser){
    try {
        const newUser= await usersManager.createAUser(objUser) 
        return newUser       
    } catch (error) {
        return error
    }
}

export async function updateUser(id,objUser){
    try {
        const newUser= await usersManager.updateAUser(id,objUser) 
        return newUser       
    } catch (error) {
        return error
    }
}

export async function deleteUser(id,objUser){
    try {
        const deletedUser = await usersManager.deleteAUser(id,objUser)
        return deletedUser        
    } catch (error) {
        return error
    }
}



