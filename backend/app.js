const express = require("express");
const cors = require("cors");
require("dotenv").config();
let corsOptions = {
  origin: "http://localhost:3000", // SonarQube security fix
};
const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.enable("trust proxy");
app.use(express.json());

app.use("/requirement", require("./routes/requirementRoutes"));
app.use("/analyst", require("./routes/analystRoutes"));
app.use("/project", require("./routes/projectRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/developer", require("./routes/developerRoutes"));

app.listen(8080, console.log("El servidor está corriendo en el puerto 8080"));
