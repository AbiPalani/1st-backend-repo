const event_route = require("express").Router();
const eventService = require("../services/event.services");
const {verifyToken} = require("../services/verifyToken.services") 


event_route.get("/view",eventService.findEvent);
event_route.post("/add",verifyToken,eventService.insertEvent);
event_route.put("/:_id",verifyToken,eventService.updateEvent);
event_route.delete("/:_id",verifyToken,eventService.deleteEvent);

module.exports = event_route;

