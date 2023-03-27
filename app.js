import  express  from 'express';
import ProductManager from "./index.js";

const app = express();
const productManager = new ProductManager() 

app.use(express.urlencoded({extended:true}))

app.get('/products',async(req,res)=>{ 
    const productos = await productManager.getProducts()
    const limit = req.query.limit
    if (limit && limit > 0){
        return res.send(productos.slice(0 , limit))
    }

    res.send (productos)
})

app.get('/products/:pid', async(req,res)=>{
    const id= Number(req.params.pid)
    const productId= await productManager.getProductById(id)
    if(!productId) return res.status(404).send("El producto no existe")
    res.send(productId)
})








app.listen (8084,() => console.log ("Preparado para hacer filtros ") )
