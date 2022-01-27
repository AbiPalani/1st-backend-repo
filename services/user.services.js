const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerSchema,loginSchema} = require("../shared/schema");
const db = require("../shared/mongo");
const JWT_SECRET = "diary21232@123";

const user_service ={
    
    async register(req,res,next) {
        try{
            const {error,value} = registerSchema.validate(req.body);
            if(error)
            return res.status(400).send({
                error:"Validation Failed",
                message:error.details[0].message,
            });

            const user =  db.users.findOne({email:req.body.email});
            if(user) return res.status(400).send({error:"user already exist"});
            console.log(user);
            const salt =  bcrypt.genSalt();
            req.body.password =  bcrypt.hash(req.body.password,salt);
            console.log(salt);
            await db.users.insertOne(req.body);
            console.log(req.body);
            res.send({message:"user register successfully"});  
            next();   
        }catch(err){
            console.log("Error Registering Data-",err);
            res.sendStatus(500);
        }
    },

    async login(req,res,next){
        try{
            const {error,value} = await loginSchema.validate(req.body);
            if(error)
            return res.status(400).send({
                error:"Validation Failed",
                message:error.details[0].message,
            });

            const user = await db.users.findOne({email:req.body.email});
            if(!user) 
                return res.status(400).send({error:"user doesn't exist"});

            const isValid = await bcrypt.compare(req.body.password,user.password);
            
            if(!isValid) 
                return res.status(401).send({error:"password did not match"});
            
                const authtoken = jwt.sign({ 
                    userId:user._id },
                     JWT_SECRET,
                    {expiresIn:"8h"}
                );
    
                res.send({authtoken}); 
            res.send({message:"User logged in successfully"});
            next();
        }catch (err){
            console.log("Error Inserting Data",err);
            res.sendStatus(500);
            res.next();
        }
    },


};
module.exports = user_service;

