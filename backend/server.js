const express = require("express");
const employeeRoute = require("./routes/employee");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const db = require("./db");
const path = require('path')
db();

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/my-app/public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/my-app/public', 'index.html'));
});

const cors = require("cors");
app.use(cors());

const PORT = 8002;

app.use(express.json());

app.use((req, res, next) => {
  console.log("application middleware");
  console.log(`${Date()}-${req.method}-${req.url}`);
  next();
});

app.use("/api/v1/emp", employeeRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
