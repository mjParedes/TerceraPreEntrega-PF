import { productCrud } from './crud.js'

let pruebasPasadas = 0
let pruebasTotales = 2


// 1. Producto creado satisfactoriamente
const test1 = productCrud({
    title: 'Webcam Noga',
    description: 'camara web multimedia',
    code: 'azx675',
    price: 19650,
    stock: 84,
    category: 'Electro'
}
)

if (test1 === 'Producto creado satisfactoriamente') {
    console.log('Test1 paso')
    pruebasPasadas++
} else {
    console.log('Test1 fallo')
}


// 2. Producto no creado por falta de campos requeridos
const test2 = productCrud({
    description: 'multifuncion, wifi , laser.',
    code: 'lij114',
    stock: 96,
    category: 'Electro'
})

if (test2 === 'No se han proporcionado todas las props') {
    console.log('Test2 paso')
    pruebasPasadas++
} else {
    console.log('Test2 fallo')
}

console.log(`Pasaron ${pruebasPasadas} test de un total de ${pruebasTotales}`)







//! Se visitará el endpoint /mockingproducts y deberá corroborarse una respuesta de 50 productos generados con el formato de un producto real del proyecto.

//! Se intentará crear un producto con todos los datos válidos, el producto debe crearse satisfactoriamente.

//! Se intentará crear un un producto  con todos los campos menos el título y el precio, los cuales deberían ser requeridos, por lo tanto, se debe recibir un error customizado, en consola debe aparecer una lista de las propiedades requeridas y los tipos (como visto en clase) para reconocer en qué propiedades no se enviaron los datos.
