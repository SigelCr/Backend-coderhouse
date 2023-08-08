import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsManager from "./ProductManager.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine()); //avisando a express que voy a tener un motor de plantilla que se llama handlebars que las funciones de ese motor es handlebars
app.set("views", __dirname + "/views"); // donde va a estar ubicado la carpeta views que van a estar las distintas plantillas
app.set("view engine", "handlebars"); // voy a estar utilizando un motor de plantilla y que el motor de plantilla es el que tiene guqardado como handlebars

//routes
app.use("/", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer); //socket del lado del servidor

//const productos = [];
//para escuchar
socketServer.on("connection", (socket) => {
  console.log("cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("cliente desconectado");
  });
  //socket.emit("bienvenida", "bienvenido al socketi.io"); //primero el nombre del evento, y luego el mensaje, ese nombre se pone del lado del cliente en index.js

  socket.on("respuestaBienvenida", (message) => {
    console.log(message);
  });

  /*   socket.on("producto", (producto) => {
    productos.push({ id: socket.id, producto }); //guardar prod en un arreglo productos
    console.log(productos); //para ver el producto en la terminal

    //con socket emitimos a un solo cliente si ponemos socketServer es a todos los usuarios
    socket.emit("allProd", productos); //emitimos un evento para el front que se llame allprod y que sea ese arreglo con los productos
  }); */

  socket.on("agregar", async (objProd) => {
    const opAdd = await productsManager.createProducts(objProd);
    if (opAdd.operation) {
      socketServer.emit("added", opAdd.newProduct);
    } else {
      socket.emit("added", opAdd.message);
    }
  });

  socket.on("eliminar", async (id) => {
    const opDel = await productsManager.deleteProduct(id);
    if (opDel.operation) {
      socketServer.emit("deleted", opDel.modData);
    } else {
      socket.emit("deleted", opDel.message);
    }
  });
});
