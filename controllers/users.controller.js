const model = require("../models/users.model")();
const db = require('../db/mongo-con')();
var userController = function () {};

userController.show = function (req, res, next) {
 
  model.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({
      users: result,
      id: "",
      nom: "",
      prenom: "",
      adresse: "",
      codePostal: "",
      ville: "",
    });
  
  });
};

userController.edit = function (req, res) {
  let id = req.params.id;
  model.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result.prenom);
    result.save();
    res.json({
      // user: [],
      Id: result.id,
      nom: result.nom,
      prenom: result.prenom,
      adresse: result.adresse,
      codePostal: result.codePostal,
      ville: result.ville,
    });
  });
};

userController.save = function (req, res) {
  if (req.body.id == 0) {
    var body = req.body;
    body.status = false;

    model.create(body, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.direct("/");
    });
  } else {
    var body = req.body;
    model.updateOne(
      { _id: body.id },
      {
        $set: {
          nom: body.nom,
          prenom: body.prenom,
          adresse: body.adresse,
          codePostal: body.codePostal,
          ville: body.ville,
        },
      },
      { multi: true },
      (error, result) => {
        if (error) throw error;
        res.redirect("/");
      }
    );
  }
};

userController.delete = function (req, res) {
  let id = req.params.id;

  model.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

module.exports = userController;
