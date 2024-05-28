import { Router } from "express";
import { getAllProducts, getPrductById, getSalidas, insertProduct, saveSalida, updateStatus, updateStock } from "../controllers/productos.controller.js";

const router = Router();

router.get("/allproducts", getAllProducts);
router.post("/insertproduct", insertProduct);
router.post("/updatestock", updateStock);
router.post("/updateestatus", updateStatus);
router.get("/productbyid", getPrductById);
router.post("/savesalida", saveSalida);
router.get("/getsalidas", getSalidas);

export default router