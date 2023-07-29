import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("servidor con express levantado en el puerto 8080");
});
//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
