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

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.thumbnail ||
      !product.stock
    ) {
      return { success: false, response: "Faltan campos" };
    }
    const codeCheck = this.#products.some((e) => e.code === product.code);
    if (codeCheck) {
      return { success: false, response: "El codigo de producto ya existe" };
    }
    this.#id++;
    const one = { id: this.#id, ...product };
    this.#products.push(one);
    await this.write();
    return { success: true, response: `Producto con id:${one.id} agregado` };
  }

  getProducts() {
    return { success: true, response: this.#products };
  }

  getProductById(id) {
    const one = this.#products.find((product) => product.id == id);
    return one
      ? { success: true, response: one }
      : { success: false, response: "Not found" };
  }

  async updateProduct(id, product) {
    //verificamos que venga informacion para actualizar
    if (!product) {
      return { success: false, response: "Nothing to update, fields missing" };
    }

    //buscar el producto por index, si no existe devolvemos not found
    const index = this.#products.findIndex((prod) => prod.id == id);
    if (index === -1) {
      return { success: false, response: "Not found" };
    }

    //actualizamos producto con la informacion dada
    try {
      const one = this.#products[index];
      Object.keys(product).forEach((item) => {
        if (one[item]) {
          one[item] = product[item];
        }
      });
      await this.write();
      return { success: true, response: one };
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
