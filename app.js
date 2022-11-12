const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const { Vonage } = require("@vonage/server-sdk");

const app = express();

//template engine
app.set('view engine','html')
app.engine('html',ejs.renderFile)

//public folder setup
app.use(express.static(__dirname + '/public'))

//body parser for middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.send("hi");
});

const port = 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
