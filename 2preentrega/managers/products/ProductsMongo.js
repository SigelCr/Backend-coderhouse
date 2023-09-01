import { productsModel } from "../../db/models/products.model.js";
//EN ESTE ARCHIVO VER EL AFTER
class ProductsMongo {
  async findAll(obj) {
    const { limit, page, sortFirstName, ...query } = obj;
    try {
      const result = await usersModel.paginate(query, {
        limit,
        page,
        sort: { first_name: sortFirstName }, //aca iria x precio
      });
      const info = {
        count: result.totalDocs,
        payload: result.docs,
        totalPages: result.totalPages,
        nextLink: result.hasNextPage
          ? `http://localhost:8080/api/users?page=${result.nextPage}`
          : null,
        prevLink: result.hasPrevPage
          ? `http://localhost:8080/api/users?page=${result.prevPage}`
          : null,
      };
      return info;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newProd = await productsModel.create(obj);
      return newProd;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      const prod = await productsModel.findById(id);
      return prod;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const prod = await productsModel.updateOne({ _id: id }, { ...obj });
      return prod;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await productsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async add(products) {
    try {
      await productsModel.create(products);
      return "Products added";
    } catch (error) {
      return error;
    }
  }

  async findOne(obj) {
    try {
      const prod = await productsModel.findOne(obj).explain("executionStats");
      console.log(prod);
      return prod;
    } catch (error) {
      return error;
    }
  }
}

export const productsMongo = new ProductsMongo();
