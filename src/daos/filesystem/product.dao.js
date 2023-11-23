import fs from "fs";

class ProductManager {
  #products = [];
  #id = 0;
  constructor(path, collectionName) {
    this.path = path;
    this.name = collectionName;
    console.log(`Instancia de Product Manager ${this.name} creada`);
    this.init();
  }

  async init() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.#products = JSON.parse(data);
        //actualizamos id
        this.#id =
          this.#products.length != 0
            ? this.#products[this.#products.length - 1].id
            : 0;

        console.log(`Archivo ${this.path} correctamente cargado`);
        return;
      } else await this.write();
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}
                   Error. ${error}`);
    }
  }

  async write() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.#products));
      console.log(`Archivo ${this.path} correctamente guardado`);
    } catch (error) {
      console.log(`Error al crear el archivo ${this.path}
                   Error. ${error}`);
    }
  }

  async create(data) {
    if (
      !data.title ||
      !data.description ||
      !data.code ||
      !data.price ||
      !data.stock ||
      !data.category
    ) {
      return false;
    }
    const codeCheck = this.#products.some((prod) => prod.code === data.code);
    if (codeCheck) {
      return false;
    }
    if (!data.status === null || data.status === undefined) {
      data.status = true;
    }
    if (!data.thumbnails === null || data.thumbnails === undefined) {
      data.thumbnails = [];
    }

    this.#id++;
    const product = { id: this.#id, ...data };
    this.#products.push(product);
    await this.write();
    return product;
  }

  getAll(limit) {
    if (!limit) {
      return this.#products;
    } else {
      return this.#products.slice(0, parseInt(limit));
    }
  }

  getById(id) {
    const product = this.#products.find((product) => product.id == id);
    return product ? product : false;
  }

  async update(id, data) {
    //verificamos que venga informacion para actualizar
    if (Object.keys(data).length === 0) {
      return "Nothing to update, fields missing";
    }

    //verificamos que no venga el id entre los datos a actualizar
    if (data.id != null || data.id != undefined) {
      delete data.id;
    }
    //buscar el producto por index, si no existe devolvemos not found
    const product = this.#products.find((prod) => prod.id == id);
    if (!product) {
      return "Not found";
    }

    //actualizamos producto con la informacion dada
    try {
      Object.keys(data).forEach((item) => {
        product[item] = data[item];
      });
      await this.write();
      return product;
    } catch (error) {
      console.log(`Error al actualizar el producto con id:${id}
                   Error. ${error}`);
    }
  }

  async remove(id) {
    //buscar el producto por index, si no existe devolvemos not found
    const index = this.#products.findIndex((prod) => prod.id == id);
    if (index === -1) {
      return "Not found";
    }

    //borramos producto con el id dado
    try {
      this.#products.splice(index, 1);
      await this.write();
      return "Product deleted";
    } catch (error) {
      console.log(`Error al eliminar el producto con id:${id}
                   Error. ${error}`);
    }
  }
}

export default ProductManager;
