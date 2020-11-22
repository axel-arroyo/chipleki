const express = require("express");
const router = express.Router();

const { Analyst } = require("../models");

router.get("/", async (req,resp) => {
    try {
        const allAnalyst = await Analyst.findAll({where:req.query});
        resp.send(allAnalyst);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});
router.get("/:id", async (req,resp) => {
    try {
        const allAnalyst = await Analyst.findAll({where:req.params});
        console.log(req.params);
        resp.send(allAnalyst);
    } catch (error) {
        resp.status(400).send("Error al hacer una query a la base de datos");
    }
});

module.exports = router;