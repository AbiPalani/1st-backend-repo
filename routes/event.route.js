const event_route = require("express").Router();
const eventService = require("../services/event.services");
const {
    authentication
  } = require("../services/verifaication.services");

event_route.get("/",authentication,eventService.findEvent);
event_route.post("/",authentication,eventService.insertEvent);
event_route.put("/:_id",authentication,eventService.updateEvent);
event_route.delete("/:_id",authentication,eventService.deleteEvent);

module.exports = event_route;

