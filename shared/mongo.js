const {MongoClient} = require("mongodb");
const URL = "mongodb+srv:mongodb+srv://diary_user:diary123@cluster0.tyua0.mongodb.net/diary?retryWrites=true&w=majority";

const client = new MongoClient(URL);

module.exports ={
  //complete conection
    db:null,

    //connection to particular collections
    events:null,
    users:null,

     async connect(){
      //connection to database
     await client.connect();
     this.db=client.db("diary");
     this.events = this.db.collection("events");
     this.users = this.db.collection("users");
  },
};


