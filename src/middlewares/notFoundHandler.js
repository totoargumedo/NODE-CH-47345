export const notFoundHandler = (req, res, next) => {
  console.log(`Not fount ${req.method} ${req.path}`);
  // return res.status(404).json({
  //   status: "error",
  //   method: req.method,
  //   path: req.url,
  //   payload: "404 Not found",
  // });
  return res.redirect("/errors/404");
};
