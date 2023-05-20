// Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
// La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
//: Debe guardar objetos con el siguiente formato
// id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)

// Aspectos a incluir

// Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
// Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
// Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto

// Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
// Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

// Se creará una instancia de la clase “ProductManager”
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

const fs = require('fs')

class ProductManager {

    #products
    #path

    constructor() {
        this.#products = [];
        this.#path = 'products.json';
        this.#addFile();
    }

    #addFile(){
        if(fs.existsSync(this.#path)){
            const dataProducts = fs.readFileSync(this.#path, 'utf-8')
            this.#products = JSON.parse(dataProducts)
        }else{
            const data = JSON.stringify(this.#products)
            fs.writeFileSync(this.#path, data)
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const existsProduct = this.#products.find((element) => {
            return element.id == product.id
        })
        const existsCode = this.#products.find((element) => {
            return element.code == product.code
        })


        if (existsProduct || existsCode) {
            console.log('Error: Producto ya agregado a la lista')
        } else {
            this.#products.push(product)
            const data = JSON.stringify(this.#products)
            fs.writeFileSync(this.#path, data)
            console.log("Producto Nuevo agregado correctamente");
        }
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        return this.#products.find((element) => {
            return element.id == id
        }) || 'ID no encontrado';
    }

    updateProduct(id, key, value) {
		const products = this.getProducts();
		const product = products.find(product => product.id === id);

		if (!product) {
			return `Error: Producto ${id} no existe`;

		} else if (!(key in product)) {
			return `No hay dato "${key}" en este producto ${id}`;
	
		} else if (!value) {
			return `El valor ingresado es incorrecto`;
		} else {
			product[key] = value;
		
			try {
				fs.writeFileSync(this.#path, JSON.stringify(products));
			} catch (err) {
				return `Error: ${err}`;
			};
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

}

let product1 = new ProductManager()



console.log(product1.addProduct('queso', 'queso', 200, 'no def', 'abc1', 10))
console.log(product1.addProduct('quesito', 'queso', 300, 'no def', 'abc2', 100))
console.log(product1.addProduct('quesito', 'queso', 300, 'no def', 'abc3', 100))
console.log(product1.getProducts())
console.log(product1.getProductById(1));
console.log(product1.getProductById(4));
console.log(product1.updateProduct(1,'title', 'quesoteee'))
console.log(product1.deleteProduct(2))