import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { uploader } from "../../utils.js";
import { list,deleteOne, getOne, save, update,updateRol,addDocuments } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', list);
userRouter.get('/:id', getOne);
userRouter.post('/', auth, save);
userRouter.put('/:id', update);
userRouter.delete('/:id', deleteOne);
userRouter.post('/premium/:iud',updateRol);
userRouter.post('/:id/documents', uploader.fields([
    {name:'products',maxCount:5},
    {name:'profiles',maxCount:2},
    {name:'documents',maxCount:10}]),addDocuments);

export default userRouter;