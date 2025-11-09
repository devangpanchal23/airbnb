const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 8085;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connection with DB successfully");
}).catch(err => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})

app.get("/" , (req,res) => {
    res.send("Home page");
    console.log("Homepage");
})