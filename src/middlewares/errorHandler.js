export const errorHandler = (error, req, res, next) => {
  console.log(error.stack);
  return res.status(500).json({
    status: "error",
    payload: error.message,
    method: req.method,
    path: req.url,
  });
};
