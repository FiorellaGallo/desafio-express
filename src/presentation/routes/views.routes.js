import express from "express";
import container from "../../container.js";
import ProductManager from "../../domain/managers/product.js";


const router = express.Router();
const productManager = container.resolve('ProductRepository');


router.get('/', async(req, res)=>{
    const products = await productManager.getProducts(null,null,10);

    const objetoParaHandlebars = {
        elementos: products
    }
    res.render('home', objetoParaHandlebars)
});

router.get('/realtimeproducts',async (req,res)=>{
    const products = await productManager.getProducts(null,null,10);
    console.log(products);
    const objetoParaHandlebars = {
        elementos: products   
    }

    res.render('realTimeProducts', objetoParaHandlebars)
});



export default router;