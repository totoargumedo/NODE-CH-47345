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
        this.#id = this.#products[this.#products.length - 1].id;
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

  async addProduct(data) {
    if (
      !data.title ||
      !data.description ||
      !data.price ||
      !data.code ||
      !data.thumbnail ||
      !data.stock
    ) {
      return { success: false, response: "Faltan campos" };
    }
    const codeCheck = this.#products.some((prod) => prod.code === data.code);
    if (codeCheck) {
      return { success: false, response: "El codigo de producto ya existe" };
    }
    this.#id++;
    const product = { id: this.#id, ...product };
    this.#products.push(product);
    await this.write();
    return {
      success: true,
      response: `Producto con id:${product.id} agregado`,
    };
  }

  getProducts() {
    return { success: true, response: this.#products };
  }

  getProductById(id) {
    const product = this.#products.find((product) => product.id == id);
    return product
      ? { success: true, response: product }
      : { success: false, response: "Not found" };
  }

  async updateProduct(id, data) {
    //verificamos que venga informacion para actualizar
    if (!data) {
      return { success: false, response: "Nothing to update, fields missing" };
    }

    //buscar el producto por index, si no existe devolvemos not found
    const product = this.#products.find((prod) => prod.id == id);
    if (!product) {
      return { success: false, response: "Not found" };
    }

    //actualizamos producto con la informacion dada
    try {
      Object.keys(data).forEach((item) => {
        if (product[item]) {
          product[item] = data[item];
        }
      });
      await this.write();
      return { success: true, response: product };
    } catch (error) {
      console.log(`Error al actualizar el producto con id:${id}
                   Error. ${error}`);
    }
  }

  async deleteProduct(id) {
    //buscar el producto por index, si no existe devolvemos not found
    const index = this.#products.findIndex((prod) => prod.id == id);
    if (index === -1) {
      return { success: false, response: "Not found" };
    }

    //borramos producto con el id dado
    try {
      this.#products.slice(this.#products[index], 1);
      await this.write();
      return { success: true, response: "Product deleted" };
    } catch (error) {
      console.log(`Error al eliminar el producto con id:${id}
                   Error. ${error}`);
    }
  }
}

export default ProductManager;
