//coleccion cart
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name: {
    //nombre del carrito
    type: String,
    required: true,
  },
  description: {
    //descripcion del carrito
    type: String,
  },
  products: [
    //es un arreglo de object ID de la coleccon products
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export const cartModel = mongoose.model("Cart", cartSchema);
