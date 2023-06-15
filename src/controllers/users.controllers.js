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

export const cookies = []


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

export async function uploadDocs(req, res){
  const token = cookies[cookies.length - 1]
  let verify
  if(token){
      verify = jwt.verify(token, config.jwt_key)
      // PROFILE
      let profile
      if(req.files.profile){
          profile = [
              {
                  name: req.files.profile[0].filename,
                  reference: req.files.profile[0].path
              }
          ]
      }
      console.log('profile', profile)
      // PRODUCT
      let product
      if(req.files.product){
          product = req.files.product
          for(let i = 0; i < product.length; i++){
              product[i].name = product[i]['filename'];
              product[i].reference = product[i]['path'];
              delete product[i].fieldname;
              delete product[i].originalname;
              delete product[i].encoding;
              delete product[i].mimetype;
              delete product[i].destination;
              delete product[i].filename;
              delete product[i].path;
              delete product[i].size;
          }
      }
      console.log('product', product)
      // ARRAYPICS
      let arrayPics
      if(profile){
          if(product){
              arrayPics = [...profile, ...product]
          }else{
              arrayPics = [...profile]
          }
      }
      if(!profile){
          if(product){
              arrayPics = [...product]
          }
      }
      // IDENTIFICATION
      let identification
      if(req.files.identification){
          identification = [
              {
                  name: req.files.identification[0].filename,
                  reference: req.files.identification[0].path
              }
          ]
      }
      // ADDRESS
      let address
      if(req.files.address){
          address = [
              {
                  name: req.files.address[0].filename,
                  reference: req.files.address[0].path
              }
          ]
      }
      // ACCOUNT
      let account
      if(req.files.account){
          account = [
              {
                  name: req.files.account[0].filename,
                  reference: req.files.account[0].path
              }
          ]
      }
      // ARRAYDOCS
      let arrayDocs
      if(identification){
          if(address){
              if(account){
                  arrayDocs = [...identification, ...address, ...account]
              }else{
                  logger.error('Could not submit documents')
                  logger.warning('You are missing the account document, please check.')
                  res.json({message: 'Could not submit documents'})
              }
          }else{
              logger.error('Could not submit documents')
              logger.warning('You are missing the address document, please check.')
              res.json({message: 'Could not submit documents'})
          }
      }else{
          logger.error('Could not submit documents')
          logger.warning('You are missing the identification document, please check.')
          res.json({message: 'Could not submit documents'})
      }

      if(arrayPics){
          const find = await getUserById({_id: verify.user[0]._id})
          find.documents = [...find.documents, ...arrayPics]
          await find.save()
          await updateUserById({_id: verify.user[0]._id}, find)
          console.log('find', find)
          res.redirect('/filesUploaded')
      }
      if(arrayDocs){
          const find = await getUserById({_id: verify.user[0]._id})
          find.documents = [...find.documents, ...arrayDocs]
          await find.save()
          await updateUserById({_id: verify.user[0]._id}, find)
          console.log('find', find)
          res.redirect('/filesUploaded')
      }
      if(!arrayPics && !arrayDocs){
          logger.error('Could not submit documents or upload files')
          logger.warning('You did not attach any documents to submit or files to upload')
          res.json({message: 'Could not submit documents or upload files'})
      }
  }
  if(token === undefined){
      res.json({message: 'You are not logged in, go back to login'})
  }
}


// export async function uploadDocs(req,res){
//   res.send('ok')
// }

