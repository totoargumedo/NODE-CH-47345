class ProductManager {
  #products = [];
  #id = 0;
  constructor(collectionName) {
    this.name = collectionName;
    console.log(`Instancia de Product Manager ${this.name} creada`);
  }

  addProduct(product) {
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
    return { success: true, response: `Producto con id:${one.id} agregado` };
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    const one = this.#products.find((product) => product.id == id);
    return one
      ? { success: true, response: one }
      : { success: false, response: "Not found" };
  }
}

export default ProductManager;
