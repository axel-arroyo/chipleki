const express = require("express");
const router = express.Router();
const verifySign = require("./verifyToken");
const { Requirement, Developer } = require("../models");

//Obtener todos los requerimientos
router.get("/", verifySign, async (req, resp) => {
  try {
    const allRequirement = await Requirement.findAll();
    resp.send(allRequirement);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

//Asignar Developer
router.post("/assign", verifySign, async (req, resp) => {
  try {
    const requirement = await Requirement.findOne({
      where: {
        id: req.body.id,
      },
    });
    requirement.id_developer = req.body.id_developer;
    await requirement.save();
    const developer = await Developer.findOne({
      where: {
        id: req.body.id_developer,
      },
    });
    developer.working = true;
    await developer.save();
    resp.send("Developer asignado");
  } catch (error) {
    resp.status(400).send("No se encuentra el requerimiento");
  }
});

//Actualizar requerimiento
router.post("/edit", verifySign, async (req, resp) => {
  try {
    const requirement = await Requirement.findOne({
      where: {
        id: req.body.id,
      },
    });
    requirement.update(req.body);
    resp.send("Requerimiento actualizado");
  } catch (error) {
    resp.status(400).send("No se encuentra el requerimiento");
  }
});

//Borrar requerimiento
router.delete("/", verifySign, async (req, resp) => {
  try {
    const requirement = await Requirement.findOne({
      where: {
        id: req.body.id,
      },
    });
    const id_developer = requirement.id_developer;
    requirement.destroy();
    if (id_developer) {
      //Volver estado de trabajador a not working
      const developer = await Developer.findOne({
        where: {
          id: id_developer,
        },
      });
      developer.working = false;
      developer.save();
    }
    resp.send("Requerimiento borrado");
  } catch (error) {
    resp.status(400).send("No se encuentra el requerimiento");
  }
});

//Crear requerimiento
router.post("/", verifySign, async (req, resp) => {
  try {
    const requirement = await Requirement.create(req.body);
    return resp.send(requirement);
  } catch (error) {
    resp.status(400).send(error);
  }
});

module.exports = router;
