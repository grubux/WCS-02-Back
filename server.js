const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const app = express();

//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
  // test a wilder creation
  WilderModel.init().then(() => {
    const firstWilder = new WilderModel({
      name: "First Wilder",
      city: "San Francisco",
      skills: [
        { title: "HTML", votes: 10 },
        { title: "React", votes: 5 },
      ],
    });
    firstWilder
      .save()
      .then((result) => {
        console.log("success:", result);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
