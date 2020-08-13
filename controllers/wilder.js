const WilderModel = require("../models/Wilder");

module.exports = {
  create: (req, res) => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => {
          res.json({ success: true, result });
        })
        .catch((err) => {
          res.json({ success: false, result: err });
        });
    });
  },
  read: (req, res) => {
    WilderModel.find()
      .then((result) => {
        if (!result) res.json({ success: false, result: "No wilders found" });

        res.json({ sucess: true, result });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false, result: err });
      });
  },
  update: (req, res) => {
    WilderModel.update({ _id: req.body._id }, req.body)
      .then((result) => {
        if (!result)
          res.json({ success: false, result: "No such wilder exists" });

        res.json(result);
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  delete: (req, res) => {
    WilderModel.deleteOne({ _id: req.body._id })
      .then((result) => {
        if (!result)
          res.json({
            success: false,
            result: "No wilder with such ID was found",
          });
        res.json({ success: true, result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
};
