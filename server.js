const express = require("express");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const cors = require("cors");

const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilder");

const app = express();

//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/v2/wilders/create", asyncHandler(wilderController.create));
app.get("/api/v2/wilders/read", asyncHandler(wilderController.read));
app.put("/api/v2/wilders/update", asyncHandler(wilderController.update));
app.delete("/api/v2/wilders/delete", asyncHandler(wilderController.delete));

app.get("*", (req, res) => {
  res.status(404);
  res.send({ success: false, message: "Wrong adress" });
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log("The name is already used");
    res.status(400);
    res.json({ success: false, message: "The name is already used" });
  }
});

//Start Server
app.listen(5000, () => console.log("Server started on 5000"));
