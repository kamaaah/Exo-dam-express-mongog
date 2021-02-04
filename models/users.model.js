module.exports = function () {
  var db = require("../db/mongo-con")();
  var Schema = require("mongoose").Schema;

  var user = Schema({
    nom: String,
    prenom: String,
    adresse: String,
    codePostal: String,
    ville: String,
  });
  
  return db.model('user', user);
};
