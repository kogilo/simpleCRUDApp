// import express from 'express'
const express = require('express')
const mongoose = require("mongoose")
const app = express()



app.listen(3000, () =>{
    console.log("Server is running on port 3000")
})

app.get('/', (req, res) => {
    res.send("Hello from Node API with update");
});

// mongoose.connect('mongodb+srv://abella:Nytagwey_24@cluster0.s03qohw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('Connected!'));


  mongoose.connect("mongodb+srv://abella:Nytagwey_24@cluster0.s03qohw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {console.log("connected");
  }).catch(()=>{
      console.log("connection failed")
  });
  