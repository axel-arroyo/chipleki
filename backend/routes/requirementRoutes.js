const express = require("express");
const router = express.Router();
const verifySign = require("./verifyToken");
const { Requirement } = require("../models");

//Obtener todos los requerimientos
router.get("/", verifySign,async (req,resp) => {
    try {
        const allRequirement = await Requirement.findAll();
        resp.send(allRequirement);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});

//Actualizar requerimiento
router.post("/edit", verifySign, async (req,resp) => {
    try {
        const requirement = await Requirement.findOne({
            where:{
                id: req.body.id,
            }
        });
        requirement.update(req.body)
        resp.send("Requerimiento actualizado");
    } catch (error) {
        resp.status(400).send("No se encuentra el requerimiento");
    }
});

//Borrar requerimiento
router.delete("/",verifySign, async (req,resp) => {
    try {
        const requirement = await Requirement.findOne({
            where:{
                id: req.body.id,
            }
        });
        requirement.destroy();
        resp.send("Requerimiento borrado");
    } catch (error) {
        resp.status(400).send("No se encuentra el requerimiento");
    }
});

//Crear requerimiento
router.post("/", verifySign,async (req,resp) =>{
    try {
        const requirement = await Requirement.create(req.body);
        return resp.send(requirement);
    } catch (error) {
        resp.status(400).send(error);
    }
});

module.exports = router;