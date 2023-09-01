import { cartModel } from "../../db/models/cart.model.js";

class CartMongo {
  async findAll() {
    try {
      const cart = await cartModel.find({});
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const cart = await cartModel.create(obj);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      const cart = await cartModel
        .findById(id)
        .populate("products", ["title", "description"]); //el populate sirve para ver a mas detalles los productos, x ej el first_name
      //si queremos solo uno, osea first_name solo, se pondria asi .populate("students","first_name") de lo contrario entre corchetes .populate("students", ["first_name", "last_name"]);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const cart = await cartModel.updateOne({ _id: id }, { ...obj });
      return cart;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await cartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idCart, idProduct) {
    try {
      //buscar carrito
      const cart = await cartModel.findById(idCart); //aca encuentra el carrito
      if (!cart) throw new Error("Cart no encontrado");
      const response = await cartModel.updateOne(
        { _id: idCart },
        { $pull: { products: idProduct } }
      ); //pull remueve un array existente
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const cartMongo = new CartMongo();
