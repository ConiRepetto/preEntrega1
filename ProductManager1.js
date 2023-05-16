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
// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

class ProductManager{
    constructor(){
        this.products = [];
    }

    

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.products.length + 1,
            title,   
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (!this.products.includes(product.code)){
            this.products.push(product);
        } else {
            console.log('Producto ya agregado a la lista')
        }
        
    }

    getProducts() {
        return this.products;
    }
}

let product1 = new ProductManager()



console.log(product1.addProduct('queso', 'queso', 200, 'no def', 'abc1', 10))
console.log(product1.addProduct('quesito', 'queso', 300, 'no def', 'abc1', 100))
console.log(product1.getProducts())