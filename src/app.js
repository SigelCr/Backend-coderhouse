import express from "express";
import { ProductManager } from "./ProductManager.js";

const manager = new ProductManager("archivo.json");
const prods = await manager.product();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("servidor con express levantado en el puerto 8080");
});

app.get("/", (req, res) => {
  res.send(
    "pagina principal, ir a /products, pero antes hacer el testing en ProductManager para agregar los productos y manipularlos"
  );
});

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  const resLimit = prods.slice(0, limit);

  if (!limit) {
    res.send({ prods });
  } else {
    res.send(resLimit);
  }
});

app.get("/products/:pid", (req, res) => {
  const pid = req.params.pid;
  const pfid = prods.find((e) => e.id == pid);
  if (!pfid) {
    res.send(`No hay producto con ID: ${pid.toUpperCase()}`);
  } else {
    res.send(pfid);
  }
});
