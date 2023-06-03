//Basic lib import
const express = require('express');
const app = new express();
const bodyParser =require('body-parser');

//Security middleware lib import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

//Database lib import
const mongoose = require('mongoose');
const {readdirSync} = require("fs");

//Security middleware implement
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit
const limiter = rateLimit({windowMs:15*60*1000, max:3000});
app.use(limiter);

//mongoDB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.aw6azwi.mongodb.net/Assignment-Module?retryWrites=true&w=majority";
let OPTION={user:'rashedul',pass:'170174Rajon',autoIndex:true}
mongoose
    .set('strictQuery',true)
    .connect(URI,OPTION)
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch((err)=>{
        console.log(err.message)
    });

//Routing Implement
readdirSync("./routes").map(r=>app.use("/api/v1", require(`./routes/${r}`)));


app.use("*",(req,res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
})

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})


module.exports = app;