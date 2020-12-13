const express = require("express");
const router = express.Router();
const { Comment } = require("../models");
const verifySign = require("./verifyToken");

//Obtener todos los comentarios
router.get("/", verifySign, async (req, resp) => {
  try {
    const allComments = await Comment.findAll();
    resp.send(allComments);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

//Crear proyecto
router.post("/", verifySign, async (req, resp) => {
  try {
    const comment = await Comment.create(req.body);
    return resp.send(comment);
  } catch (error) {
    resp.status(400).send(error);
  }
});

module.exports = router;
