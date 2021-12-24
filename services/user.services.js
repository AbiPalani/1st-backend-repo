const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerSchema,loginSchema} = require("../shared/schema");
const db = require("../shared/mongo");
const JWT_SECRET = "diary21232@123";

const user_service ={
    
    async register(req,res) {
        try{
            const {error,value} = await registerSchema.validate(req.body);
            if(error)
            return res.status(400).send({
                error:"Validation Failed",
                message:error.details[0].message,
            });

            const user = await db.users.findOne({email:req.body.email});
            if(user) return res.status(400).send({error:"user already exist"});
            
            const saltRounds= 10;            
            const salt = await bcrypt.genSalt(saltRounds);
            const newPass = await bcrypt.hash(value.password,salt);
            req.body.password = newPass;

            await db.users.insertOne(...req.body);
            res.send({message:"user register successfully"});     
        }catch(err){
            console.log("Error Reading Data-",err);
            res.sendStatus(500);
        }
    },

    async login(req,res){
        try{
            const {error,value} = await loginSchema.validate(req.body);
            if(error)
            return res.status(400).send({
                error:"Validation Failed",
                message:error.details[0].message,
            });


            const user = await db.users.findOne({email:value.email});
            if(!user) return res.status(400).send({error:"user doesn't exist"});

            const isValid = await bcrypt.compare(value.password,user.password);
            
            if(!isValid) return res.status(401).send({error:"password did not match"});

            const authtoken = jwt.sign({ 
                userId:user._id },
                 JWT_SECRET,
                {expiresIn:"8h"}
            );

            res.send({authtoken});            
        }catch (err){
            console.log("Error Inserting Data",err);
            res.sendStatus(500);
        }
    },

};
module.exports = user_service;

