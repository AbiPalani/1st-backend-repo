const MongoClient = require("mongodb").MongoClient;

const URI = "mongodb+srv://diary-app:diary123@cluster0.tyua0.mongodb.net/diary?retryWrites=true&w=majority";
const client = new MongoClient(URI);

module.exports ={
  //complete conection
    db:null,

    //connection to particular collections
    events:null,
    users:null,

     async connect(){
      //connection to database
     await client.connect();
     this.db=client.db(process.env.DB_Name);
     this.events = this.db.collection("events");
     this.users = this.db.collection("users");
  },
};



