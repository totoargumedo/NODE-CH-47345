export const localThumbnails = (req, res, next) => {
  //agregamos las rutas de las imagenes a thumbnails
  req.body.thumbnails.push(req.file.path);
  next();
};
