const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ndq1omz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
       await client.connect();
       const userCollection = client.db('dashboard').collection('users');

       app.put('/user/:email', async(req,res)=>{
             const email = req.params.email;
             const user = req.body;
             const filter = {email:email}
             const options = {upsert: true};
             const updateDoc = {
                $set: user,
              };
              const result = await userCollection.updateOne(filter,updateDoc,options);
              res.send(result);
       });

       app.put('/user/teacher/:email', async(req,res)=>{
        const email = req.params.email;
        const filter = {email:email}
        const updateDoc = {
           $set: {role:'teacher'},
         };
         const result = await userCollection.updateOne(filter,updateDoc);
         res.send(result);
         });
    
        //  name api 
        app.put('/user/:displayName', async(req,res)=>{
            const displayName = req.params.displayName;
           
            const filter = {displayName:displayName};
           
            const updateDoc = {
               $set: user,
             };
             const result = await userCollection.updateOne(filter,updateDoc);
             res.send(result);
             });
    

       app.get('/user', async(req,res)=>{
        const query = {};
        const cursor = userCollection.find(query);
        const user = await cursor.toArray();
        res.send(user);
      })
    }
   
    finally {

    }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('I am from dashboard server site')
})

app.listen(port, () => {
    console.log(`server site is running on port ${port}`)
})