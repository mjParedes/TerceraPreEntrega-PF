import { Router } from "express";
import logger from '../utils/winston.js'


const router = Router()


router.get('/',(req,res) =>{
    res.send('Estas en la pagina de logger')
    logger.error('Esto es un log de error')
    logger.warn('Esto es un log de warning')
    logger.info('Esto es un log de info')
    logger.http('Esto es un log de http')
    logger.verbose('Esto es un log de verbose')
    logger.debug('Esto es un log de debug')
    logger.silly('Esto es un log de silly')
})

export default router