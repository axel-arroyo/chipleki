const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.enable("trust proxy");
app.use(express.json());

app.use("/requirement",require("./routes/requirementRoutes"));
app.use("/analyst",require("./routes/analystRoutes"));
app.use("/project",require("./routes/projectRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.listen(8080, console.log("El servidor está corriendo en el puerto 8080"));