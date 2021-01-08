const router = require("express").Router();
const {
  Developer,
  Technology,
  Quotation,
  Requirement,
  Rating,
} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifySign = require("./verifyToken");

//Obtener developers
router.get("/", verifySign, async (req, resp) => {
  try {
    const developers = await Developer.findAll({
      attributes: ["id", "name", "email"],
    });
    return resp.send(developers);
  } catch (error) {
    resp.status(400).send(error);
  }
});

router.post("/devquotations", verifySign, async (req, resp) => {
  try {
    const dev = await Developer.findOne({
      where: {
        email: req.body.email,
      },
    });
    const id_dev = dev.id;
    const quotations = await Quotation.findAll({
      where: {
        id_developer: id_dev,
      },
    });
    return resp.send(quotations);
  } catch (error) {
    resp.status(400).send(error);
  }
});

//Obtener developers con sus technologies, cotizaciones y rating
router.post("/data", verifySign, async (req, resp) => {
  try {
    console.log(req.body);
    const developers = await Developer.findAll({
      where: {
        working: false,
      },
      include: [
        Technology,
        {
          model: Rating,
          attributes: ["rating"],
        },
        {
          model: Quotation,
          attributes: ["value"],
          required: true,
          where: { id_requirement: req.body.id_requirement },
        },
      ],
    });
    return resp.send(developers);
  } catch (error) {
    resp.status(400).send(error);
  }
});

//Agregar rating
router.post("/rate", verifySign, async (req, resp) => {
  try {
    const rating = await Rating.create({
      rating: req.body.rating,
      id_developer: req.body.id_developer,
    });
    return resp.send(rating);
  } catch (error) {
    resp.status(400).send(error);
  }
});

//Agregar cotizacion
router.post("/quotation", verifySign, async (req, resp) => {
  try {
    console.log("A");
    const dev = await Developer.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log("B");
    const quotation = await Quotation.create({
      id_developer: dev.id,
      id_requirement: req.body.id_requirement,
      value: req.body.value,
    });
    return resp.send(quotation);
  } catch (error) {
    resp.status(400).send(error);
  }
});

module.exports = router;
