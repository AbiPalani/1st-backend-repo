const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerSchema,loginSchema} = require("../shared/schema");
const db = require("../shared/mongo");
const JWT_SECRET = "diary21232";

const user_service ={
    
    async register(req,res,next) {
        try{
            const {error,value} = await registerSchema.validate(req.body);
            if(error)
            return res.status(400).send({
                error:"Validation Failed",
                message:error.details[0].message,
            });

            const user =  await db.users.findOne({email:value.email});
            if(user) return res.status(400).send({error:"user already exist"});
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            value.password = await bcrypt.hashSync(value.password,salt);
            console.log(salt);
            await db.users.insertOne(value);
            console.log(value);
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
            
                const token = jwt.sign({ 
                    userId:user._id },
                     JWT_SECRET,
                    {expiresIn:"8h"}
                );
                const auth = res.header("x-auth-token",token)
                .json({ token}); 
                console.log(auth);
                if(auth){
                    try{
                    req.user = jwt.verify(auth,JWT_SECRET);
                    console.log(req.user);
                    next();
                    }catch(err){
                     res.sendStatus(401);
                    }
                }else{
                    res.status(401);
                }

        }catch (err){
            console.log("Error in Logging",err);
            res.sendStatus(500);
        }
    },
};
module.exports = user_service;
