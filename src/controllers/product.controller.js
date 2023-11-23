import * as service from "../services/product.services.js";

//get all products
export const getAll = async (req, res, next) => {
  try {
    let response;
    if (req.query.limit) {
      response = await service.getAll(req.query.limit);
    } else {
      response = await service.getAll();
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

//get product by id
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response)
      res.status(404).json({ success: false, response: "Product not found" });
    else res.status(200).json({ success: true, response: response });
  } catch (error) {
    next(error);
  }
};

//create product
export const create = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      code,
      category,
      stock,
      status,
      thumbnails,
    } = req.body;

    const product = {
      title,
      description,
      code,
      price: parseFloat(price),
      status,
      stock: parseInt(stock),
      category,
      thumbnails,
    };
    const response = await service.create(product);
    if (!response)
      res.status(404).json({ success: false, response: "Product not created" });
    else res.status(201).json({ success: true, response: response });
  } catch (error) {
    next(error);
  }
};

//update product
export const update = async (req, res, next) => {
  try {
    //Nos aseguramos que venga informacion para actualizar
    const data = req.body;
    const { id } = req.params;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, response: "Nothing to update" });
    }

    const response = await service.update(id, data);

    //Si la respuesta del manager no es un objeto, devuelve el mensaje de error
    if (!response) {
      return res
        .status(400)
        .json({ success: false, response: "Product not updated" });
    }
    return res.status(200).json({ success: true, response: response });
  } catch (error) {
    next(error);
  }
};

//delete product
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await service.remove(id);

    //Si la respuesta del manager no es un objeto, devuelve el mensaje de error
    if (!response) {
      return res
        .status(400)
        .json({ success: false, response: "Product not deleted" });
    }

    return res
      .status(200)
      .json({ success: true, response: `Product id:${id} deleted` });
  } catch (error) {
    next(error);
  }
};
