import { Router } from "express";
import productsManager from "../ProductManager.js";

const router = Router();

router.get(`/`, async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsManager.getProducts(); //buscar todos los productos
    if (limit) {
      res
        .status(200)
        .json({ message: `products`, products: products.slice(0, limit) }); // si sale bien mostra el status 200 con un mensaje que diga products y que muestre los products
    } else {
      res.status(200).json({ message: `products`, products });
    }
  } catch (error) {
    res.status(500).json({ error }); //si hay error muestra el status 500 con el error
  }
});

//los : es para que sea dinamico
router.get(`/:idProduct`, async (req, res) => {
  //cuando el id se manda como params se recupera asi
  //req.params es un objeto que tiene una propiedad idProduct
  console.log(req.params);
  const { idProduct } = req.params;
  try {
    const products = await productsManager.getProductById(+idProduct); // ese + para convertilo en numero
    console.log("controlando que products no sea undefined:", products);
    if (!products) {
      return res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.status(200).json({ message: `product`, products });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto solicitado" });
  }
});

//agregar, cambia el metodo
router.post(`/`, async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const product = {
    title,
    description,
    code,
    price,
    status: true, // status TRUE por defecto
    stock: stock,
    category,
    thumbnails: thumbnails ? thumbnails.split(",") : [],
  };
  console.log("producto", product);
  try {
    const newProduct = await productsManager.createProducts(product);

    res.status(200).json({ message: `Product created`, Product: newProduct });
    console.log("nuevo producto", newProduct);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//update
router.put(`/:idProduct`, async (req, res) => {
  const { idProduct } = req.params;
  try {
    const productUpdated = await productsManager.updateProduct(
      +idProduct,
      req.body
    ); //el id y el objeto a cambiar
    res.status(200).json({ message: `Product updated` }); //la respuesta muestra el msj que se actualizo, y se visualiza en el json
  } catch (error) {
    res.status(500).json({ error });
  }
});

//delete
router.delete(`/:idProduct`, async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await productsManager.deleteProduct(+idProduct);
    res.status(200).json({ message: `Product deleted` }); //tambien se ve refleado en los json que si elimina el producto
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
