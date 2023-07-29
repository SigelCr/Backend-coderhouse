import { Router } from "express";
import cartManager from "../CartManager.js";

const router = Router();

router.get("/id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartManager.getAllCart(+id);
    res.status(200).json({ message: `cart`, cart });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const createCart = await cartManager.createCart();
    res.status(200).json({ message: "cart", cart: createCart });
  } catch (error) {
    res.status(200).json({ error });
  }
});

router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const addProduct = await cartManager.addProduct(+idCart, +idProduct);
    res.status(200).json({ message: "cart-product", cart: addProduct });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error });
  }
});

export default router;
