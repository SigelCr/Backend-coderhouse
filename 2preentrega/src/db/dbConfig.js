import mongoose from "mongoose";

const URI =
  "mongodb+srv://tomasmsigel:tomascapo50>@cluster0.07pcrpv.mongodb.net/ecommerce2DaEntrega?retryWrites=true&w=majority";

mongoose
  .connect(URI) //para conectar l¡con la base de datos, pasar la URI
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((error) => {
    console.log(error);
  });
