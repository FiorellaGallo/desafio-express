import { Router } from "express";
import { createCart, findCartById, updateCart } from "../controllers/cartsController.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid",findCartById );
router.post("/:cid/product/:pid", updateCart);

export default router;
