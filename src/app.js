import express from 'express'
import ProductManager from "./ProductManager.js"

const app = express()

const product1 = new ProductManager() //instancio la clase 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) =>{
    res.send("<h1 style='color: green'>Bienvenido a mi tienda</h1>")
})

app.get("/products", (req, res) => {
    const products = product1.getProducts() //creo una variable que contenga el resultado de llamar al metodo
    let { limit } = req.query; //creo una variable que contenga el limit pasado por query http://localhost:8080/products?limit=3
    if (limit) return res.json(products.slice(0, parseInt(limit)))//si me pasan un limit lo uso
    //if(isNaN(limit)) res.json({error: "Limite ingresado invalido"})
    return res.json(products)// si no me pasan un limit salta al segundo return
})

app.get("/products/:pid", (req, res) => {
    const { pid } = req.params; //creo una variable que contenga el id pasado por params
    const product = product1.getProductById(pid)//creo una variable que contenga el resultado de llamar al metodo con el id pasado como parametro http://localhost:8080/products/4
    if (product) return res.json(product)
    res.json({ error: "Producto no encontrado" })
})

app.post("/products",(req, res)=>{
    const product = req.body;
    const newProduct = product1.addProduct(product)
    res.status(201).json(product)
})



app.get("/carts", (req, res) => {})



app.listen(8080, () => {
    console.log("Server is running on port 8080")
})





// console.log(product1.addProduct('Crema Facial Diurna', 'Hecho a mano. Hipoalergénico. En ecoenvases reutilizables de 50cc', 'crema1', 2500, true, 100, 'cremas','no def'))
// console.log(product1.addProduct('Crema Facial Nocturna', 'Crema facial terapéutica nocturna','creman', 2500, true, 100,'no def'))
// console.log(product1.addProduct('Broncodilatadora', 'Artesanal. Flores naturales. Eucalyptus globulus y aloe barbadensis. Cera de abejas de opérculo','crema51', 2500, true, 100,'no def'))
// console.log(product1.addProduct('Jabón medicinal', 'De glicerina vegetal. Limpieza hidratante. Artesanal. Hipoalergénico.Peso 100g', 'crema166', 2500, true, 100,'no def'))
// console.log(product1.addProduct('Pomada descongestiva', 'Con eucalyptus cinerea, alcanfor y menta común. Para ayudarte a ventilar mejor.', 'pom', 2500, true, 100,'no def'))
// console.log(product1.addProduct('Crema1', 'Con eucalyptus cinerea, alcanfor y menta común. Para ayudarte a ventilar mejor.', 'pom3', 2500, true, 100,'no def'))
// console.log(product1.addProduct('Crema2', 'Con eucalyptus cinerea, alcanfor y menta común. Para ayudarte a ventilar mejor.', 'pom5', 2500, true, 100,'no def'))
// console.log(product1.addProduct('Crema3', 'Con eucalyptus cinerea, alcanfor y menta común. Para ayudarte a ventilar mejor.', 'pom4', 2500, true, 100,'no def'))

//console.log(product1.addProduct('Pomada descongestiva', 2000, 'crema3', 100)) //Prueba Error en AddProduct

// console.log(product1.getProducts())
// console.log(product1.getProductById(1));
// console.log(product1.updateProduct(1, "stock", 200));
