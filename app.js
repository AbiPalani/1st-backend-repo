const express = require("express");
const mongodb = require("./shared/mongo");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const eventRoutes = require("./routes/event.route");
const { authentication } = require("./services/verifaication.services");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await mongodb.connect();
    app.use(cors());
    app.use(express.json());
    app.use("/users", userRoutes);
    app.use(authentication);
    app.use("/events", eventRoutes);
    app.listen(PORT, () => {
      console.log("Server running in PORT", PORT);
    });
  } catch (err) {
    console.log(err);
  }
})();