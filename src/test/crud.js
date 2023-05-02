export const productCrud = ({title, description, code, price, stock, category}) => {
    if (title && description && code && price && stock && category) {
        return 'Producto creado satisfactoriamente'
    }
    if (!title || !description || !code || !price || !stock || !category) {
        return 'No se han proporcionado todas las props'
    }
}