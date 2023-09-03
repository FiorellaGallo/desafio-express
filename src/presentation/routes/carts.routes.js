import { Router } from 'express';
import { createCart, findCartById, updateCart, deleteProduct, deleteAllProducts, updateAllProducts, updateQuantity, purchase } from '../controllers/cartsController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';


const router = Router();

router.post('/', createCart);
router.get('/:cid',findCartById );
router.post('/:cid/product/:pid',auth, authorization('postCart'), updateCart);
router.delete('/:cid/product/:pid', deleteProduct);
router.delete('/:cid',deleteAllProducts);
router.put('/:cid',updateAllProducts);
router.put('/:cid/product/:pid',updateQuantity);
router.post('/:cid/purchase',auth, authorization('postPurchase'),purchase);

export default router;
