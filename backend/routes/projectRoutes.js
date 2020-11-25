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

//Revisar proyecto
router.get("/:id", async (req,resp) => {
    try {
        const allProject = await Project.findAll({where:req.params});
        console.log(req.params);
        resp.send(allProject);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});

//Revisar requerimiento
router.get("/:id/:id_req", async (req,resp) => {
    try {
        const requirement = await Project.findOne({where:req.params})
        console.log(req.params);
        resp.send(requirement)
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

//Crear requerimientos al proyecto de id especificada
router.post("/:id/", async (req,resp) => {
    try {
        const requirement = await Requirement.create(req.body);
    } catch (error) {
        resp.status(400).send(error);
    }
})

module.exports = router;