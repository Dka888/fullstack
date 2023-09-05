import { Router } from "express";
const router = Router();
import * as basketController from '../controllers/basketController.js';


router.post("/add", basketController.addToBasket);
router.get("/:userId", basketController.getFromBasket);
router.patch("/one/:userId", basketController.updateOneItemFromBasket);
router.patch("/all/:userId", basketController.updateAllItemFromBasket);
router.patch("/quantity/:userId", basketController.updateQuantities);
router.delete('/:id', basketController.deleteItem)
export default router;