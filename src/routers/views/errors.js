import { Router } from "express";

const errorsRouter = Router();

//403
errorsRouter.get("/403", async (req, res, next) => {
  try {
    res.render("403", { user: req.session.user.first_name });
  } catch (error) {
    next(error);
  }
});

//404
errorsRouter.get("/404", async (req, res, next) => {
  try {
    res.render("404", { user: req.session.user.first_name });
  } catch (error) {
    next(error);
  }
});

export default errorsRouter;
