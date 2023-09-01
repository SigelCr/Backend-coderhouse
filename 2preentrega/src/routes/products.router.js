import { Router } from "express";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { __dirname } from "../utils.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsMongo.findAll(req.query);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await productsMongo.findById(id);
    if (!prod) {
      res.status(400).json({ message: "Invalid ID" });
    } else {
      res.status(200).json({ message: "Prod found", prod });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = req.body;
  if (
    !title ||
    !description ||
    !price ||
    !thumbnail ||
    !code ||
    !stock ||
    !status ||
    !category
  ) {
    return res.status(400).json({ message: "some data is missing!!!!!!!" });
  }
  try {
    const newProd = await productsMongo.createOne(req.body);
    res.status(200).json({ message: "Product created", Product: newProd });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//
router.put("/:d", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});

//agregar productos a la bd
const path = __dirname + "/Products.json";
router.get("/add", async (req, res) => {
  const prodData = await fs.promises.readFile(path, "utf-8");
  console.log("products", prodData);
  await productsMongo.add(JSON.parse(prodData));
  res.json({ message: "Products added" });
});

/* router.get("/", async (req, res) => {
  const obj = { first_name: "Wren" };
  const user = await usersMongo.findOne(obj);
  res.json({ user });
}); */

export default router;
