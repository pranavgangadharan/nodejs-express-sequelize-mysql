const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {	
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
  res.setHeader('Access-Control-Allow-Credentials', true);    
  next();
});


// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
db.sequelize.sync();
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
});


// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to esparkinfo application."})
});

require("./app/routes/tutorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});