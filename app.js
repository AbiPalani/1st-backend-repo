const express = require("express");
const {ignoreFavicon,authentication,logging}=require("./shared/middleware")
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const eventsRoutes = require("./routes/event.route")
const mongo = require("./shared/mongo");
const cookieSession = require("cookie-session");
require("dotenv").config();


const app = express();

(async()=>{
    try{
        await mongo.connect();
        app.use(cors());

        // parse requests of content-type - application/json
        app.use(express.json());

        // parse requests of content-type - application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));

        cookieSession({
            name: "Diary-session",
            secret: "COOKIE_SECRET", // should use as secret environment variable
            httpOnly: true
        })

        // simple route
        app.get("/", (req, res) => {
        res.send({ message: "Welcome to Diary application." });
        });
        app.use("/users",userRoutes);
        app.use(authentication);
        app.use(logging);
        app.use("/events",eventsRoutes);
            
        // set port, listen for requests
        const PORT = 3001;
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        });
    }catch(err){
        console.log("Server starting error",err);
    }
})();