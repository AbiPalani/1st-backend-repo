const event_route = require("express").Router();
const eventService= require("../services/event.services");

event_route.get("/",eventService.findEvent);
event_route.post("/",eventService.insertEvent);
event_route.put("/:_id",eventService.updateEvent);
event_route.delete("/:_id",eventService.deleteEvent);


module.exports = event_route;