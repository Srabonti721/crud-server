const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
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
// insert data to mongodb
        //    const database = client.db('usersDB');
        //    const usersCollection = database.collection('users');
        const usersCollection = client.db('usersDB').collection('users')

           app.get('/users', async(req,res)=>{
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result)
           })

           app.get('/users/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.findOne(query)
            res.send(result);
           })

         app.post('/users', async(req, res)=>{
            console.log(req.body);
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
         })

         app.put('/users/:id', async(req, res)=>{
          const id = req.params.id;
          const filter = {_id: new ObjectId(id)};
          const user = req.body;

          const updatedDoc = {
            $set:{
               name:user.name,
               email:user.email
            }
          }
          const option = {upsert:true}
          console.log(user);
          const result = await usersCollection.updateOne(filter, updatedDoc, option)
          res.send(result)
          
         })

         app.delete("/users/:id", async(req, res)=>{
            const id = req.params.id
            console.log("to de deleted",id);
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.deleteOne(query)
            res.send(result)
         })


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