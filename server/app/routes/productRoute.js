
import { Router } from "express";
const router = Router();
import * as productController from "../controllers/productController.js";


router.post("/add", productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

router.post("/products/add-many", productController.addManyProducts);

export default router;