const express = require("express");
const {authentication ,logging}=require("./shared/middleware")
const cors = require("cors");
const eventRoutes = require("./routes/event.route");
const userRoutes = require("./routes/user.route");
const mongo = require("./shared/mongo");

require("dotenv").config();



const Port = process.env.PORT || 3001;

const app=express();

app.use(cors());

(async()=>{
    try{
        await mongo.connect();
        app.use(express.json());
        app.use("/users",userRoutes);
        app.use(authentication);
        app.use(logging);
        app.use("/event",eventRoutes);
        app.listen(Port, ()=> console.log("Server running at port",Port));
    }catch(err){
        console.log("Server starting error",err);
    }
})();
