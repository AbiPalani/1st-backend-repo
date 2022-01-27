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
        const corsOptions =  function (req, res) {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader('Access-Control-Allow-Methods', '*');
          res.setHeader("Access-Control-Allow-Headers", "*");
          res.end();
        };
        app.use(express.json());     
        app.use("/users", cors(corsOptions),userRoutes);
        app.use(authentication);
        app.use(logging);
        app.use("/events", cors(corsOptions),eventsRoutes);
        app.listen(Port, ()=> console.log("Server running at port",Port));
    }catch(err){
        console.log("Server starting error",err);
    }
})();
