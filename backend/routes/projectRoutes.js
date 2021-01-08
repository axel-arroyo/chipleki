const express = require("express");
const router = express.Router();
const { Project, Requirement } = require("../models");
const verifySign = require("./verifyToken");

//Obtener todos los proyectos
router.get("/", verifySign, async (req, resp) => {
  try {
    const allProject = await Project.findAll();
    resp.send(allProject);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

//Crear proyecto
router.post("/", verifySign, async (req, resp) => {
  try {
    const user = req.user;
    if (user.type === "Manager" || user.type === "Analyst") {
      const project = await Project.create(req.body);
      return resp.send(project);
    }
    return resp
      .status(401)
      .send("No tienes los permisos para crear un proyecto");
  } catch (error) {
    resp.status(400).send(error);
  }
});

//Crear requerimientos al proyecto de id especificada
router.post("/requirement/", verifySign, async (req, resp) => {
  try {
    user = req.user;
    if (user.type === "Manager" || user.type === "Analyst") {
      const requirement = await Requirement.create(req.body);
      return resp.send(requirement);
    }
    return resp
      .status(401)
      .send("No tienes los permisos para crear un requerimiento");
  } catch (error) {
    resp.status(400).send(error);
  }
});

module.exports = router;
