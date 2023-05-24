import { Router } from "express";
import { login,logout,signup,current} from "../controllers/sessionsController.js"
import auth from "../middlewares/auth.js";

const sessionRouter = Router();

sessionRouter.post('/login',login);
sessionRouter.post('/logout', logout);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

export default sessionRouter;