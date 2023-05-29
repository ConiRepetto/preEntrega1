// Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
// El servidor debe contar con los siguientes endpoints:
// ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto.
// Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
// Si no se recibe query de límite, se devolverán todos los productos
// Si se recibe un límite, sólo devolver el número de productos solicitados
// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
// Sugerencias
// Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
// Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 
// Link al repositorio de Github con el proyecto completo, el cual debe incluir:
// carpeta src con app.js dentro y tu ProductManager dentro.
// package.json con la info del proyecto.
// NO INCLUIR LOS node_modules generados.

//Ya hice: 
// npm init -y
// npm install -g nodemon
// agregue: "type": "module", en el package.json
// agregue: el script en elo package.json > "start": "nodemon index.js". Esto hace que cuando ponga  -npm start- en consola, me ejecute el comando: "nodemon index.js" IMPORTANTE: cambiar script dependiendo del nombre del archivo x ej APP.JS
// hice: npm i express > crea: "dependencies": {"express": "^4.18.2"} en package.json

import express from 'express'
//import ProductManager from "../ProductManager3.js"
// import products from "../products.json"

const app = express()

//const product1 = new ProductManager()

app.use(express.urlencoded({extended:true}))

app.get("/products", (res, req) => {
    let{limit} = req.query;
    let productsLimit = products.slice(0,parseInt(limit))
    res.send(productsLimit)

})

app.get("/products/:pid", (req, res) =>{
    const {pid} = req.params;
    const product = products.find(product => product.id == pid)
    if(product) return res.json(product)
    res.json({error: "Producto no encontrado"})
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})





// console.log(product1.addProduct('Crema Facial Diurna', 'Hecho a mano. Hipoalergénico. En ecoenvases reutilizables de 50cc', 2500, 'no def', 'crema1', 100))
// console.log(product1.addProduct('Crema Facial Nocturna', 'Crema facial terapéutica nocturna', 3000, 'no def', 'creman2', 150))
// console.log(product1.addProduct('Broncodilatadora', 'Artesanal. Flores naturales. Eucalyptus globulus y aloe barbadensis. Cera de abejas de opérculo', 3000, 'no def', 'bronco1', 120))
// console.log(product1.addProduct('Jabón medicinal', 'De glicerina vegetal. Limpieza hidratante. Artesanal. Hipoalergénico.Peso 100g', 1500, 'no def', 'jabon1', 1000))
// console.log(product1.addProduct('Pomada descongestiva', 'Con eucalyptus cinerea, alcanfor y menta común. Para ayudarte a ventilar mejor.', 2000, 'no def', 'crema3', 100))
// //console.log(product1.addProduct('Pomada descongestiva', 2000, 'crema3', 100)) //Prueba Error en AddProduct
// console.log(product1.getProducts())
// console.log(product1.getProductById(1));
// console.log(product1.updateProduct(1, "stock", 200));