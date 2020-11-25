const express = require("express");
const router = express.Router();
const { Project, Requirement } = require("../models");

//Todos los proyectos
router.get("/", async (req,resp) => {
    try {
        const allProject = await Project.findAll();
        resp.send(allProject);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});

//Crear proyecto
router.post("/", async (req,resp) => {
    try {
        const project = await Project.create(req.body);
        return resp.send(project);
    } catch (error) {
        resp.status(400).send(error);
    }
});

//Todos los Requerimientos
router.get("/requirement/", async (req,resp) => {
    try {
        const requirements = await Requirement.findAll();
        resp.send(requirements);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});

//Crear requerimientos al proyecto de id especificada
router.post("/requirement/", async (req,resp) => {
    try {
        const requirement = await Requirement.create(req.body);
        return resp.send(requirement);
    } catch (error) {
        resp.status(400).send(error);
    }
})

module.exports = router;