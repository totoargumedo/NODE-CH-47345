export const validateAdmin = (req, res, next) => {
  if (req.session.user.role != "admin") {
    return res.redirect("/errors/403");
  } else {
    return next();
  }
};
