import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express()
dotenv.config();
const port=process.env.PORT;
app.use(cors());
app.use(express.json())


const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongdb is Connected ✌😊");
  return client;
}

const client = await createConnection();


app.get('/mobiles', async function (req, res) {
    const result=await client.db('b28we').collection('moblies').find().toArray();
  res.send(result);
})
app.post('/mobiles', async function (req, res) {
    const data=req.body;
    const result=await client.db('b28we').collection('moblies').insertMany(data);
    res.send(result);
  })

app.listen(port,()=>console.log("App started in ",port))