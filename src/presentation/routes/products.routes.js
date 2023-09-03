import { Router } from 'express';
import { uploader } from '../../utils.js';
import { getAllProducts,getOneById,uploaderProduct,updateOneProduct,deleteById } from '../controllers/productsController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const router = Router();


router.get('/',getAllProducts);
router.get('/:pid',getOneById);
router.post('/add',auth, authorization('postProduct'),uploader.single('thumbnail'),uploaderProduct);
router.put('/update/:pid',auth, authorization('putProduct'), updateOneProduct);
router.delete('/delete/:pid',auth, authorization('deleteProduct'), deleteById);



export default router;
