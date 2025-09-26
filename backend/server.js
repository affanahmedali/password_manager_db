const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const cors = require ('cors')

dotenv.config()

const app = express()
const port = 3000
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url)
const dbName = 'Passop'
client.connect()

app.use(bodyParser.json())
app.use(cors())

//Get All the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  // console.log('Found documents =>', findResult);
  res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const saveResult = await collection.insertOne(password);
  console.log('password: ', password)
  console.log('Found documents =>', saveResult);
  res.send({success: true, result: saveResult})
})

//Delete a password
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const deletePass = await collection.deleteOne(password);
  console.log('password deleted', deletePass)
  res.send({success: true, result: deletePass, conclusion: "password deleted"})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})