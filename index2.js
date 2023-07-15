const fs = require(`fs`);

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, `utf-8`);
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(obj) {
    try {
      const prevProduct = await this.getProducts(); //casi todos los metodos tienen que utilizar este getUser xq hay que leer la totalidad de la info del archivo y si no hay archivo es un []

      let id;
      if (!prevProduct.length) {
        id = 1;
      } else {
        id = prevProduct[prevProduct.length - 1].id + 1;
      }

      prevProduct.push({ ...obj, id });
      await fs.promises.writeFile(this.path, JSON.stringify(prevProduct));
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const prevProduct = await this.getProducts();
      const product = prevProduct.find((prod) => prod.id === id); //buscar producto x id
      if (!product) {
        return `producto con id no encontrado`;
      } else {
        return product;
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, db) {
    try {
      const prevProduct = await this.getProducts();
      const productIndex = prevProduct.findIndex((prod) => prod.id === id);
      if (productIndex === -1) {
        return `No hay producto con ese id`;
      }
      const product = prevProduct[productIndex];
      const productUpdate = { ...product, ...db };
      prevProduct[productIndex] = productUpdate; //prevuser son los usuarios en el arreglo, userindex el indice de los usuarios esos dos son igual a usuario actualizado
      await fs.promises.writeFile(this.path, JSON.stringify(prevProduct));
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const prevProduct = await this.getProducts();
      const newArrayProduct = prevProduct.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProduct));
    } catch (error) {
      return error;
    }
  }
}

const product1 = {
  title: `producto prueba`,
  description: `Este es un producto prueba`,
  price: 200,
  thumbnail: `Sin imagen`,
  code: `abc123`,
  stock: 25,
};

db = {
  title: `titulo actualizado`,
  price: 1000,
};

async function prueba() {
  const product = new ProductManager(`Productos.json`);
  //agregar producto
  await product.addProduct(product1);
  console.log(product);

  //ver productos agregados
  // const products = await product.getProducts();

  //obtener producto por id
  //const productById = await product.getProductById(2);
  // console.log(productById);

  //eliminar producto por id
  // await product.deleteProduct(1);

  //actualizar producto por id
  // await product.updateProduct(1, db); //el id a modificar, y el objeto que tiene la info que va a modificar en este caso se llama db

  // console.log(products);
}

prueba();
