
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MynoteBook")
.then(()=>{
    console.log("Connection is Successful");
}).catch((e)=>{
    console.log("No connection");
})