//FS PRODUCT DAO
// import ProductManager from "../daos/filesystem/product.dao.js";

// const productsDao = new ProductManager(
//   "./src/daos/filesystem/data/lightsabers.json",
//   "lightsabers"
// );

//MONGO PRODUCT DAO
import ProductDaoMongo from "../daos/mongodb/product.dao.js";
const productsDao = new ProductDaoMongo();

//get all products
export const getAll = async (page, limit, sort, query) => {
  try {
    const products = await productsDao.getAll(page, limit, sort, query);
    if (!products) return false;
    else return products;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//get product by id
export const getById = async (id) => {
  try {
    const product = await productsDao.getById(id);
    if (!product) return false;
    else return product;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//create product
export const create = async (data) => {
  try {
    const newProduct = await productsDao.create(data);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//update product
export const update = async (id, data) => {
  try {
    const updatedProduct = await productsDao.update(id, data);
    if (!updatedProduct) return false;
    else return updatedProduct;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//delete product
export const remove = async (id) => {
  try {
    const deletedProduct = await productsDao.remove(id);
    if (!deletedProduct) return false;
    else return deletedProduct;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};
