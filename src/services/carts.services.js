//FS CART DAO
import CartManager from "../daos/filesystem/cart.dao.js";

const cartsDao = new CartManager(
  "./src/daos/filesystem/data/carts.json",
  "carts"
);

//get all carts
export const getAll = async () => {
  try {
    const carts = await cartsDao.getAll();
    if (!carts) return false;
    else return carts;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//get cart by id
export const getById = async (id) => {
  try {
    const cart = await cartsDao.getById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//create cart
export const create = async (data) => {
  try {
    const newCart = await cartsDao.create(data);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//add product to cart
export const addProductById = async (id, data) => {
  try {
    const updatedCart = await cartsDao.addProductById(id, data);
    if (!updatedCart) return false;
    else return updatedCart;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//add product to cart
export const removeProductById = async (id, data) => {
  try {
    const updatedCart = await cartsDao.removeProductById(id, data);
    if (!updatedCart) return false;
    else return updatedCart;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};

//remove cart by id
export const remove = async (id) => {
  try {
    const cart = await cartsDao.remove(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log("Product service error: " + error);
  }
};
