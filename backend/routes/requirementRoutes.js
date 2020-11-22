const express = require("express");
const router = express.Router();

const { Requirement } = require("../models");

router.get("/", async (req,resp) => {
    try {
        const allRequirement = await Requirement.findAll({where:req.query});
        resp.send(allRequirement);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});
router.get("/:id", async (req,resp) => {
    try {
        const allRequirement = await Requirement.findAll({where:req.params});
        console.log(req.params);
        resp.send(allRequirement);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});
router.post("/",async (req,resp) =>{
    try {
        const genRequirement = await Requirement.create(req.body);
    } catch (error) {
        resp.status(400).send(error);
    }
});

module.exports = router;