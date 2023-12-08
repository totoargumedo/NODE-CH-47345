import * as service from "../services/product.services.js";

//get all products
export const getAll = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    const { title, category, status } = req.query || null;
    let query = {};
    if (title) {
      query = { title: new RegExp(req.query.title, "i") };
    }
    if (category) {
      query = { category: category };
    }
    if (status) {
      query = { status: status };
    }
    const response = await service.getAll(page, limit, sort, query);
    const next = response.hasNextPage
      ? `/api/products?page=${response.nextPage}`
      : null;
    const prev = response.hasPrevPage
      ? `/api/products?page=${response.prevPage}`
      : null;
    res.status(200).json({
      status: "success",
      payload: response.docs,
      totalResults: response.totalDocs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: prev,
      nextLink: next,
    });
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
      res.status(404).json({ status: "error", payload: "Product not found" });
    else res.status(200).json({ status: "success", payload: response });
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
      res.status(404).json({ status: "error", payload: "Product not created" });
    else res.status(201).json({ status: "success", payload: response });
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
        .json({ status: "error", payload: "Nothing to update" });
    }

    const response = await service.update(id, data);

    //Si la respuesta del manager no es un objeto, devuelve el mensaje de error
    if (!response) {
      return res
        .status(400)
        .json({ status: "error", payload: "Product not updated" });
    }
    return res.status(200).json({ status: "success", payload: response });
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
        .json({ status: "error", payload: "Product not deleted" });
    }

    return res
      .status(200)
      .json({ status: "success", payload: `Product id:${id} deleted` });
  } catch (error) {
    next(error);
  }
};
