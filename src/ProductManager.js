import * as fs from "node:fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async product() {
    try {
      if (fs.existsSync(this.path)) {
        // busca si hay o no archivo
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data); // consultar porque si pongo data =JSON.parse(data) da error pero usandolo en otra variable da correcto
      } else {
        return []; // retorna arreglo vacio para que el addproduct trabaje
      }
    } catch {
      (error) => {
        return error;
      };
    }
  }

  async getProducts() {
    try {
      let variablew = await this.product();
      console.log(await variablew);
    } catch {
      (error) => {
        return error;
      };
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !stock || !code) {
        //analiza si todos los campos estan llenos
        console.log("ERROR: No todos los datos están completos.");
        return;
      }
      let list = await this.product();
      const listCode = list.find((e) => e.code === code); // busca si el code esta repetido
      if (listCode) {
        console.log("El código ingresado existe, por favor ingrese uno nuevo");
        return;
      }
      let obj = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      let id;
      if (list.length == 0) {
        id = 1;
      } else {
        id = list[list.length - 1].id + 1;
      }

      list.push({ ...obj, id });
      await fs.promises.writeFile(this.path, JSON.stringify(list));
      console.log(`El producto con id ${id} a sido generado exitosamente`);
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }

  async getProductsById(id) {
    try {
      let list = await this.product();
      const itemId = list.find((e) => e.id === id);
      if (itemId) {
        console.log(itemId);
        return itemId;
      } else {
        console.log(`No hay producto con el id ${id}`);
      }
    } catch {
      (error) => {
        return error;
      };
    }
  }
  async deleteProduct(id) {
    try {
      let list = await this.product();
      if (list.findIndex((e) => e.id === id) !== -1) {
        const newList = list.filter((e) => e.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newList));
        console.log(`El producto con id ${id} a sido removido`);
      } else {
        console.log("El producto que intenta eliminar, no existe");
      }
    } catch {
      (error) => {
        return error;
      };
    }
  }

  async updateProduct(id, k) {
    try {
      let list = await this.product();
      let objKey = Object.keys(k);
      let noId = objKey.find((e) => e === "id");
      if (noId) {
        console.log(
          "No se puede modificar la identificación, ingrese valores válidos"
        );
        return;
      }
      const ub = list.findIndex((e) => e.id === id);
      if (ub !== -1) {
        const objRaw = list[ub];
        const objMod = { ...objRaw, ...k };
        list[ub] = objMod;
        console.log("cambio realizado");
        fs.promises.writeFile(this.path, JSON.stringify(list));
      } else {
        console.log(`No hay producto con el id ${id}`);
      }
    } catch {
      (error) => {
        return error;
      };
    }
  }
}

// TESTING

const manager = new ProductManager("archivo.json");
//ver productos agregados
//manager.getProducts();
//agregar productos 1x1
//manager.addProduct("teclado ergonómico", "ergonómico", 2200, " ", 1, 22);
//manager.addProduct("teclado multimedia", "multimedia", 1900, " ", 2, 22);
//manager.addProduct("teclado flexible", "flexible", 2300, " ", 5, 22);
//manager.addProduct("teclado en pantalla", "de pantalla", 2200, " ", 88, 22);
//manager.addProduct("teclado de proyección", "protegido", 2200, " ", 4, 20);
//manager.addProduct("teclado de membrana", "membrana", 2500, " ", 40, 20);
//manager.addProduct("teclado capacitivos.", "capacitivos", 2400, " ", 51, 20);
//manager.addProduct("teclado metálico", "metálico", 5000, " ", 19, 20);
/*manager.addProduct("mouse mecánico", "tipo de mouse más antiguo", 1200, " ", 22, 20);*/
//manager.addProduct("mouse gaming", "para videojuegos", 9200, " ", 14, 20);

//export const c = manager.getProducts();

//obtener producto por ID
//manager.getProductsById(1);

//actualizar producto
//manager.updateProduct(2, { title: "hola" });

//para ver el cambio en la terminal
//manager.getProducts();

//eliminar producto x id
//manager.deleteProduct(5);
