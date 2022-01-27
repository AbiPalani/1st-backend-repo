const express = require("express");
const {ignoreFavicon,authentication ,logging}=require("./shared/middleware")
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const eventsRoutes = require("./routes/event.route")
const mongo = require("./shared/mongo");
require("dotenv").config();


const Port = process.env.PORT || 3001;

const app=express();

(async()=>{
    try{
        await mongo.connect();
        app.use(ignoreFavicon);
        app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", '*');
          res.header("Access-Control-Allow-Credentials", true);
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
          res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
          next();
        });

        app.use(cors()); // <---- use cors middleware
        app.use(express.json());   
        app.use("/",function(req,res,next){
          res.status(200).send("Welcome");
          next();
        })  
        app.use("/users",userRoutes);
        app.use(authentication);
        app.use(logging);
        app.use("/events",eventsRoutes);
        app.listen(Port, ()=> console.log("Server running at port",Port));
    }catch(err){
        console.log("Server starting error",err);
    }
})();
