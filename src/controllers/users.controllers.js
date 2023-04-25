import { getAll, createUser, updateUser, deleteUser } from '../services/users.service.js'

export async function getAllUsers(req, res) {
    try {
        const users = await getAll()
        if (users.length === 0){
            res.status(200).json({message: 'No users'})
        } else {
            res.status(200).json({ message: 'Users found',users})
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function createNewUser(req, res) {
    const { first_name, last_name, email, password, age } = req.body
    if (!first_name || !last_name || !email || !password || !age) {
      res.status(400).json({ error: 'Data missing' })
    }
    try {
      const newUser = await createUser(req.body)
      res.status(200).json({ message: 'User created', user: newUser })
    } catch (error) {
      res.status(500).json({ error })
    }
  }