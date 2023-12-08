import * as service from "../services/carts.services.js";

//obtener todos los carritos
export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};

//obtener carrito por id
export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await service.getById(cid);
    if (!response) {
      return res
        .status(400)
        .json({ status: "error", payload: "Cart not found" });
    }
    return res.status(200).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};

//crear carrito nuevo
export const create = async (req, res, next) => {
  try {
    const response = await service.create();
    if (!response)
      res.status(404).json({ status: "error", payload: "Cart not created" });
    else res.status(201).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};

//agregar producto al carrito
export const addProductById = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = parseInt(req.query.quantity) || 1;
    const response = await service.addProductById(cid, { pid, quantity });
    if (!response) {
      return res.status(400).json({
        status: "error",
        payload: "Cart not found or product not added",
      });
    }
    return res.status(200).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};

//quitar producto al carrito
export const removeProductById = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const response = await service.removeProductById(cid, pid);
    if (typeof response != "object") {
      return res.status(400).json({ status: "error", payload: response });
    }
    return res.status(200).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};

//quitar todos los productos dell carrito
export const removeAllProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const response = await service.removeAllProducts(cid);
    if (typeof response != "object") {
      return res.status(400).json({ status: "error", payload: response });
    }
    return res.status(200).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};

//elminiar carrito
export const remove = async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await service.remove(cid);
    if (!response) {
      return res.status(400).json({
        status: "error",
        payload: "Cart not found or not deleted",
      });
    }
    return res.status(200).json({ status: "success", payload: response });
  } catch (error) {
    next(error);
  }
};
