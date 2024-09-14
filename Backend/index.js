 const connectToMongo = require('./db');
 const express = require('express');
 const app = express();
 const port = 5000;
 const cors = require('cors')
 app.use(cors())
 

 app.use(express.json())
 //Available Routes
 app.use('/auth', require('./routes/auth'));
 app.use('/notes', require('./routes/notes'));
 app.get('/', (req, res)=>{
   res.send("Hello");
 })

 app.listen(port , ()=>{
    console.log("Listening at port " + port)
 })