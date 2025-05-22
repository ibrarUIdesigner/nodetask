const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./api/routes/userRoutes");
const errorHandler = require("./api/middlewares/errorHandler");
const path = require("path");

const app = express();

//? MIDDLEWARES
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//? ROUTES
app.use("/api/v1/users", userRoutes);

//? ERROR HANDLER
app.use(errorHandler);

module.exports = app;
