class ProductManager {
  //elemento products con array vacio
  constructor() {
    this.products = [];
  }

  //devuelve todos los productos creados hasta el momento
  getProducts() {
    return this.products;
  }

  //método que agrega un producto, al arreglo de productos inicial(que esta vacio)
  addProduct(title, description, price, thumnail, code, stock) {
    //repeticion del campo "code"
    let codeExist = this.products.find((prod) => prod.code === code);
    if (codeExist) {
      console.error(`ERROR: El campo del codigo ${code} ya existe`);
      return;
    }
    //campos obligatorios
    if (!title || !description || !price || !thumnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }
    //id autoincrementable
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    //creando producto
    const newProduct = {
      id,
      title,
      description,
      price,
      thumnail,
      code,
      stock,
    };
    //agrego el producto al array de this.products
    this.products.push(newProduct);
  }
  //obtener producto por id
  getProductById(id) {
    const productById = this.products.find((prod) => prod.id === id);
    if (productById) {
      return productById;
    } else {
      console.error("Not found: El producto buscado mediando ID no existe");
    }
  }
}
//creando productManager
const manager = new ProductManager();

console.log("getProducts inicial:", manager.getProducts());

manager.addProduct(
  `titulo de prueba`,
  `descripcion de prueba`,
  100,
  `sin imagen`,
  `abc123`,
  10
);
manager.addProduct(
  `titulo de prueba2`,
  `descripcion de prueba2`,
  200,
  `sin imagen2`,
  `abc12345`,
  20
);
manager.addProduct(
  `titulo de prueba3`,
  `descripcion de prueba3`,
  300,
  `sin imagen3`,
  `abc12345678`,
  30
);

console.log(
  "getProducts luego de agregar los productos",
  manager.getProducts()
);

//Al intentar agregar un producto con el mismo código, al repetirse arroja error en la terminal.

manager.addProduct(
  `titulo de prueba3`,
  `descripcion de prueba3`,
  300,
  `sin imagen3`,
  `abc12345678`,
  30
);

//corroborando si getProductById devuelve error si no encuentra el producto, o el producto en caso de encontrarlo
const productId = manager.getProductById(2);
console.log("Producto mediante ID encontrado:", productId);

//Probando que pasa si busco un producto con un ID inexistente
const productNotFound = manager.getProductById(15);
