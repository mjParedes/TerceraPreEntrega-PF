import UsersManager from "../persistencia/DAOs/mongoManagers/UsersManager.js";

const usersManager = new UsersManager()

export async function getAll() {
    try {
        const users = await usersManager.getUsers()
        return users
    } catch (error) {
        return error
    }
}

export async function getOneUser(id) {
    try {
        const user = await usersManager.getUserById(id)
        return user
    } catch (error) {
        return error
    }

}

export async function addOneUser(obj) {
    try {
        const newUser = await usersManager.addUser(obj)
        return newUser
    } catch (error) {
        return error
    }
}


export async function updateOneUser(id, obj) {
    try {
        const updateUser = await usersManager.updateUser(id, obj)
        return updateUser
    } catch (error) {
        return error
    }
}

export async function deleteOneUser(id) {
    try {
        const deletedUser = await usersManager.deleteUser(id)
        return deletedUser
    } catch (error) {
        return error
    }
}

export async function deleteUsers() {
    try {
        const deletedUsers = await usersManager.deleteAll()
        return deletedUsers
    } catch (error) {
        return error
    }
}



