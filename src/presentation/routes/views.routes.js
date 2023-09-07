import express from 'express';
import container from '../../container.js';




const router = express.Router();
const productManager = container.resolve('ProductRepository');


router.get('/', async(req, res)=>{
    const products = await productManager.find(null,null,10);

    const objetoParaHandlebars = {
        elementos: products
    }
    res.render('home', objetoParaHandlebars)
});

router.get('/realtimeproducts',async (req,res)=>{
    const products = await productManager.find(null,null,10);
    req.prodLogger.info(products);
    const objetoParaHandlebars = {
        elementos: products   
    }

    res.render('realTimeProducts', objetoParaHandlebars)
});

router.get ('/changePassword',async (req,res) =>{
    const objetoParaHandlebars = {
        userName: 'Fiorella'   
    }

    res.render('changePassword',objetoParaHandlebars)
})



export default router;