const {MongoClient} = require("mongodb");
const URL = "mongodb+srv://abi:abi@123@cluster0.vsb9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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


