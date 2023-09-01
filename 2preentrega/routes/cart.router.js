import { Router } from "express";
import { cartMongo } from "../managers/cart/CartMongo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cart = await cartMongo.findAll();
    res.status(200).json({ message: "cart found", cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartMongo.findById(id);
    if (!cart) {
      res.status(400).json({ message: "invalid ID" });
    } else {
      res.status(200).json({ message: "cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "some data is missing error " });
  }
  try {
    const newCart = await cartMongo.createOne(req.body);
    res.status(200).json({ message: "cart created", carritoProducto: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const result = await coursesMongo.deleteStudent(idCart, idProduct);
    res.status(200).json({ message: "Success delete product" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//router.put("/:id") completar

export default router;
