import winston from "winston"
import config from "../config.js"


let logger

if (config.node_env === 'development') {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                )
            })
        ]
    })
} else if (config.node_env === 'production') {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                )
            }),
            new winston.transports.File({
                level: 'error',
                filename: './errors.log'
            })
        ]
    })
} else {
    logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.label({ label: 'Selecciona una variable de entorno!' }),
        ),
        transports: [new winston.transports.Console()]
    });
}




export default logger