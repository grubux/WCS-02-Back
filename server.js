const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
