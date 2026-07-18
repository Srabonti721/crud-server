const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(cors());
app.use(express.json());

// user:simpleDBUser
// pass:9ehlDQDv3Toqnqf2
const uri = "mongodb+srv://simpleDBUser:9ehlDQDv3Toqnqf2@cluster0.efzq5bn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try{
         await client.connect();
         await client.db("admin").command({ping:1});
         console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{
    
    }
}
run().catch(console.dir);

app.get('/',(req, res)=>{
    res.send("crud server")
})

app.listen(port,()=>{
    console.log(`curd server running on port ${port}`);  
})