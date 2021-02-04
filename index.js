const { response } = require("express");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
var flash = require("connect-flash");

var MongoClient = require('mongodb').MongoClient;
var app = express();
/* Appel du module user.js */
var user = require('./routes/user');
app.use('/', user);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(
  "/assets/css",
  express.static(__dirname + "node_modules/bootstrap/dist/css")
);
/*  Déclaration de la vue Embedded Javascript (EJS) */
app.set("engine_view, ejs");

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status = status;
  res.render("error");
});


var server = {
  port: 27017,
};
app.listen(server.port, () =>
  console.log(`Server started, listening port : ${server.port}`)
);
