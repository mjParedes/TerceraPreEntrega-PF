import { faker } from "@faker-js/faker";

faker.setLocale('es')

export const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(6),
        price: faker.commerce.price(),
        stock: faker.random.numeric(),
        category: faker.commerce.department()
    }
    return product;
}