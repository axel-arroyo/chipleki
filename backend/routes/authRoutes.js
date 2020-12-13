const router = require("express").Router();
const { User, Manager, Analyst, Client } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifySign = require("./verifyToken");

//Obtener usuarios
router.get("/", verifySign, async (req,res) =>{
    try {
        const users = await User.findAll({attributes: ['email','type']});
        return res.send(users);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post("/register", verifySign, async (req, res) => {
    try {
        const userType = req.body.type;
        const emailValid = await User.findOne({
            where:{
                email: req.body.email,
            }
        });
        if (emailValid) return res.status(400).send("Este usuario ya existe");
        //se encripta la constrasena
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.pass, salt);
        //se crea el usuario
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            pass: hashPass,
            type: req.body.type
        });
        var newaccount = null;
        switch(req.body.type){
            case "Manager":
                newaccount = await Manager.create({
                    name: req.body.name,
                    email: req.body.email
                });
                break;
            case "Analyst":
                newaccount = await Analyst.create({
                    name: req.body.name,
                    email: req.body.email
                });
                break;
            case "Client":
                newaccount = await Client.create({
                    name: req.body.name,
                    email: req.body.email
                });
                break;
            default:
                break;
        };
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(400).send("usuario o contrasena equivocada");
        }
        const validPass = await bcrypt.compare(req.body.pass, user.pass);
        if (!validPass){
            return res.status(400).send("usuario o contrasena equivocada");
        }
        const token = jwt.sign({email:user.email,type:user.type,name:user.name}, process.env.SECRET_TOKEN);
        return res.header('Access-Control-Expose-Headers', 'auth-token').header("auth-token",token).send(token);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;