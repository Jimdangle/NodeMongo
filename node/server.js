// server.js

const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.DB_URL);

//Create an app
const app = express();

app.use('/', (req,res,next) => {
    if(req.query){
        console.log(req.query);
    }
    next();
})

app.get('/', (req, res) => {
    res.send('Hello world\n');
});


app.post('/', (req, res) => {
    res.send(req.query);
});



//Listen port
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
load_mongo();

async function load_mongo(){
    try {
        await client.connect(); //initialize databse here
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close(); // 
    }
}
