import { Router } from 'express';
import { changeUserPassword, sendEmail } from '../controllers/emailController.js';
import auth from '../middlewares/auth.js';

const emailRouter = Router();

emailRouter.get('/', sendEmail);
emailRouter.post('/changeUserPassword',auth,changeUserPassword);

export default emailRouter;