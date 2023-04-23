import UsersManager from "../dao/mongoManagers/UsersManager";

const usersManager = new UsersManager()

export async function getAll(){
    try {
        const users = await usersManager.getAll()
        return users        
    } catch (error) {
        return error
    }
}

export async function createUser(objUser){
    try {
        const newUser= await usersManager.createUser(objUser) 
        return newUser       
    } catch (error) {
        return error
    }
}




