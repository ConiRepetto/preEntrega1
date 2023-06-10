import { json } from "express";
import fs from "fs"

class ProductManager {

    #products
    #path

    constructor() {
        this.#products = [];
        this.#path = './src/products.json';
        this.#addFile();
    }

    #addFile() {
        if (fs.existsSync(this.#path)) {
            const dataProducts = fs.readFileSync(this.#path, 'utf-8')
            this.#products = JSON.parse(dataProducts)
        } else {
            const data = JSON.stringify(this.#products)
            fs.writeFileSync(this.#path, data)
        }
    }

    addProduct = (title, description, code, price, stock,category, thumbnail) => {
        const product = {
            id: this.#products.length + 1,
            title: String,
            description: String,
            code: String,
            price: Number,
            status: true,
            stock: Number,
            category: String,
            thumbnail: String,
            
        }
        const existsProduct = this.#products.find((element) => {
            return element.id == product.id
        })
        const existsCode = this.#products.find((element) => {
            return element.code == product.code
        })

        if (!title || !description || !code || !price || !stock || !category || !thumbnail ) {
            throw new Error("Error: Falta completar campos del producto")
        } else if (existsProduct || existsCode) {
            console.log('Error: Producto ya agregado a la lista')
        } else {
            this.#products.push(product)
            const data = JSON.stringify(this.#products)
            fs.writeFileSync(this.#path, data)
            console.log("Producto Nuevo agregado correctamente");
        }
    }

    getProducts() {
        const dataProducts = fs.readFileSync(this.#path, 'utf-8')
        return JSON.parse(dataProducts); //decirle que lea el .json no el array
    }

    getProductById(id) {
        return this.#products.find((element) => {
            return element.id == id
        }) || 'ID no encontrado';
    }

    updateProduct(id, key, value) {
        const products = this.getProducts();
        const product = products.find(product => product.id === id);

        if (!product) return `Error: Producto ${id} no existe`;
        if (!(key in product)) return `No hay dato "${key}" en este producto ${id}`;
        if (!value) return `El valor ingresado es incorrecto`;
        product[key] = value;
        try {
            fs.writeFileSync(this.#path, JSON.stringify(products));
            return `Se actualizo ${key} en Producto ${id}`
        } catch (err) {
            return `Error: ${err}`;
        };
    };

    deleteProduct(id) {
        const products = this.getProducts();
        const productList = products.findIndex(product => product.id === id);
    
        if (productList !== -1) {
            products.splice(productList, 1);
            try {
    
                fs.writeFileSync(this.#path, JSON.stringify(products));
            } catch (err) {
                return `Error: ${err}`;
            };
        } else {
            return `No hay productos con el ID: ${id}`;
        };
    };

};

export default ProductManager

// let product1 = new ProductManager()

// console.log(product1.addProduct('Crema Facial Diurna', 'Hecho a mano. Hipoalergénico. En ecoenvases reutilizables de 50cc', 'crema1', 2500, true, 100, 'cremas','no def'))

// console.log(product1.addProduct('Crema Facial Diurna', 'Hecho a mano. Hipoalergénico. En ecoenvases reutilizables de 50cc', 2500, 'no def', 'crema1', 100))
// console.log(product1.addProduct('Crema Facial Nocturna', 'Crema facial terapéutica nocturna', 3000, 'no def', 'creman2', 150))
// console.log(product1.addProduct('Broncodilatadora', 'Artesanal. Flores naturales. Eucalyptus globulus y aloe barbadensis. Cera de abejas de opérculo', 3000, 'no def', 'bronco1', 120))
// console.log(product1.addProduct('Jabón medicinal', 'De glicerina vegetal. Limpieza hidratante. Artesanal. Hipoalergénico.Peso 100g', 1500, 'no def', 'jabon1', 1000))
// console.log(product1.addProduct('Pomada descongestiva', 'Con eucalyptus cinerea, alcanfor y menta común. Para ayudarte a ventilar mejor.', 2000, 'no def', 'crema3', 100))
// //console.log(product1.addProduct('Pomada descongestiva', 2000, 'crema3', 100)) //Prueba Error en AddProduct
// console.log(product1.getProducts())
// console.log(product1.getProductById(1));
// console.log(product1.updateProduct(1, "stock", 200));

