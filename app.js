require('dotenv').config({path:__dirname+'/d.env'});
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const path = require('path')
const { Vonage } = require("@vonage/server-sdk");

const app = express();

console.log(process.env)
console.log(`${process.env.VONAGEAPIKEY}`)
console.log(process.env.VONAGEAPISECRET)

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})






//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html')
app.engine('html',ejs.renderFile)

//public folder setup
app.use(express.static(path.join(__dirname,'/public')))

//body parser for middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.render("index");
});

app.post('/',(req,res)=>{
  console.log(req.body)

  const to=req.body.to;
  const from=req.body.from
  const text=req.body.text

  async function sendSMS() {
    await vonage.sms.send({to,from,text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); 
    //  emmitting response
})
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}
sendSMS();

})

const port = 5000;

const server = app.listen(port, () => console.log(`server running on port ${port}`));
const io =socketio(server)
io.on('connection',(socket)=>{console.log('connecting');
io.on('disconnect',()=>{
  console.log('disconnected')
})

})
