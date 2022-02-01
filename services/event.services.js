const {ObjectId} = require("mongodb");

const mongo = require("../shared/mongo");

const event_service ={
    async findEvent(req,res){
        try{
            const data=await mongo.events.find({_id:req.user._id}).toArray();
            res.send(data);
        }catch(err){
            console.log("Error Reading Data-",err);
            res.sendStatus(500);
        }
    },
async insertEvent(req,res){
    try{
        const {insertedId:_id} = await mongo.events.insertOne({...req.body,_id:req.user._id});
        res.send({...req.body,_id});
    }catch (err){
        console.log("Error Inserting Data",err);
        res.sendStatus(500);
    }
},

async updateEvent(req,res){
    try{
        const {value} =await mongo.events.findOneAndUpdate(
            {_id:ObjectId(req.params.id),_id:req.user._id},
            {$set:{...req.body}},
            );
            res.send(value);
        }catch(err){
            console.log("Error Updating Data",err);
            res.sendStatus(500);
        }
},
async deleteEvent(req,res){
    try{
        const event = await mongo.events.findOne({_id:ObjectId(req.params.id),_id:req.user._id});
        if(!event) return res.status(401).send({error:"you can't access this event"});

        await mongo.events.deleteOne(
            {_id:ObjectId(req.params.id)}
            );
            res.end();
        }catch(err){
            console.log("Error Deleting Data",err);
            res.sendStatus(500);
        }
},
};
module.exports = event_service;

