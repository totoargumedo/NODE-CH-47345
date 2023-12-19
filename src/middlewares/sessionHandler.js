export const sessionHandler = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  } else {
    return next();
  }
};
