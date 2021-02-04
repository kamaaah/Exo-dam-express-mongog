const model = require("../models/users.model")();

var userController = function () {};

userController.show = function (req, res, next) {
  mdoel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json("user.ejs", {
      user: result,
      userId: "",
      userNom: "",
      userPrenom: "",
      userAdress: "",
      userCp: "",
      userCity: "",
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
      user: [],
      userId: result.id,
      userNom: result.nom,
      userPrenom: result.prenom,
      userAdress: result.adresse,
      userCp: result.codePostal,
      userCity: result.ville,
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
      res.direct("/users/");
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
        res.redirect("/users/");
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
    res.redirect("/users/");
  });
};

module.exports = userController;
