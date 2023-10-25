import { Router } from "express";
import api_router from "./api/api.js";

const index_router = Router();

//routers
index_router.use("/api", api_router);

//endpoints raiz

index_router.get("/", (req, res) => {
  res.send(
    `<div style="height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;">
    <h1>WELCOME STRANGER</h1>
    <h2>este es un div centrado</h2>
    <h3>&#128517;</h3>
    </div>`
  );
});

export default index_router;
