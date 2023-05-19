import { getAll, createUser, updateUser, deleteUser, getUser } from '../services/users.service.js'
import jwt from 'jsonwebtoken'
import logger from '../utils/winston.js'
import config from '../config.js'   


export async function getAllUsers(req, res) {
  try {
    const users = await getAll()
    if (users.length === 0) {
      res.status(200).json({ message: 'No users' })
    } else {
      res.status(200).json({ message: 'Users found', users })
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

export async function getOneUser(req, res) {
  const uID = req.session.email
  try {
    const user = await getUser(uID)
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export async function changeRole(req, res) {
  const { uid } = req.params
  const find = await usersModel.findById({ _id: uid })
  if (!find) {
    logger.error('User not found')
    logger.warning('There is no user with that id')
    res.json({ message: 'User not found' })
  }
  if (find.role === 'Admin') {
    logger.error('Cannot change role')
    logger.warning('You cannot change the role of the admin')
    res.json({ message: 'Cannot change role' })
  }
  if (find.role === 'Premium') {
    const changeRole = await usersModel.findByIdAndUpdate({ _id: uid }, { role: "User" })
    if (!changeRole) {
      logger.error('Could not change role')
      logger.warning('Role could not be changed, check the variables')
      res.json({ message: 'Could not change role' })
    }
    const newRole = await usersModel.findById({ _id: uid })
    logger.info('Roled changed to: User')
    res.json({ message: 'Roled changed to: User', newRole })
  }
  if (find.role === 'User') {
    const changeRole = await usersModel.findByIdAndUpdate({ _id: uid }, { role: "Premium" })
    if (!changeRole) {
      logger.error('Could not change role')
      logger.warning('Role could not be changed, check the variables')
      res.json({ message: 'Could not change role' })
    }
    const newRole = await usersModel.findById({ _id: uid })
    logger.info('Roled changed to: Premium')
    res.json({ message: 'Roled changed to: Premium', newRole })
  }
}