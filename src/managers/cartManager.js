import fs from "fs";

class CartManager {
  #carts = [];
  #id = 0;
  constructor(path, collectionName) {
    this.path = path;
    this.name = collectionName;
    console.log(`Instancia de Cart Manager ${this.name} creada`);
    this.init();
  }

  async init() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.#carts = JSON.parse(data);
        //actualizamos id
        this.#id =
          this.#carts.length != 0 ? this.#carts[this.#carts.length - 1].id : 0;

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
      await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
      console.log(`Archivo ${this.path} correctamente guardado`);
    } catch (error) {
      console.log(`Error al crear el archivo ${this.path}
                   Error. ${error}`);
    }
  }

  async addProduct(data) {
    if (
      !data.title ||
      !data.description ||
      !data.code ||
      !data.price ||
      !data.stock ||
      !data.category
    ) {
      return "Fields missing";
    }
    const codeCheck = this.#carts.some((prod) => prod.code === data.code);
    if (codeCheck) {
      return "Invalid or repetead code";
    }
    if (!data.status === null || data.status === undefined) {
      data.status = true;
    }
    if (!data.thumbnails === null || data.thumbnails === undefined) {
      data.thumbnails = [];
    }

    this.#id++;
    const product = { id: this.#id, ...data };
    this.#carts.push(product);
    await this.write();
    return product;
  }

  getProducts() {
    return this.#carts;
  }

  getProductById(id) {
    const product = this.#carts.find((product) => product.id == id);
    return product ? product : "Not found";
  }

  async updateProduct(id, data) {
    //verificamos que venga informacion para actualizar
    if (Object.keys(data).length === 0) {
      return "Nothing to update, fields missing";
    }

    //verificamos que no venga el id entre los datos a actualizar
    console.log(data);
    if (data.id != null || data.id != undefined) {
      delete data.id;
    }
    console.log(data);
    //buscar el producto por index, si no existe devolvemos not found
    const product = this.#carts.find((prod) => prod.id == id);
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

  async deleteProduct(id) {
    //buscar el producto por index, si no existe devolvemos not found
    const index = this.#carts.findIndex((prod) => prod.id == id);
    if (index === -1) {
      return "Not found";
    }

    //borramos producto con el id dado
    try {
      this.#carts.splice(index, 1);
      await this.write();
      return "Product deleted";
    } catch (error) {
      console.log(`Error al eliminar el producto con id:${id}
                   Error. ${error}`);
    }
  }
}

export default CartManager;
