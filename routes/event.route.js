const event_route = require("express").Router();
const eventService= require("../services/event.services");

event_route.get("/view",eventService.findEvent);
event_route.post("/add",eventService.insertEvent);
event_route.put("/add",eventService.updateEvent);
event_route.delete("/view",eventService.deleteEvent);


module.exports = event_route;