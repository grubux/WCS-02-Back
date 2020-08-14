const express = require("express");
const mongoose = require("mongoose");
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

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder/create", runAsyncWrapper(wilderController.create));
app.get("/api/wilder/read", runAsyncWrapper(wilderController.read));
app.put("/api/wilder/update", wilderController.update);
app.delete("/api/wilder/delete", wilderController.delete);

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
