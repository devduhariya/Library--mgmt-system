
const express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017";
const cors = require("cors");
const { request } = require('express');
const { mongo } = require('mongoose');
const lmsModel = require('./lmsModel');
//"mongodb+srv://sukhdev:sukh@mongo@cluster0.0d1iv.mongodb.net/learningMongo?retryWrites=true&w=majority";
const DATABASE_NAME = "lms-db";
const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection, categoryCollection;

const isNullOrUndefined = (val) => val === null || val === undefined;

// register user
app.post("/users", async (request, response) => {
    console.log('request.body: ', request.body);
    const email = request.body.email;
    const user = await collection.findOne({ "email": email });

    if (user) {
        return response.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        collection.insertOne(request.body, (error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result.result);
        });
    }
});

// validate login
app.post("/login-validate", (request, response) => {
    console.log('request.body: ', request.body);
    const email = request.body.email;
    const password = request.body.password;
    collection.findOne({ "email": email, "password": password }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        if (result) {
            response.send('Login valid');
        } else {
            response.status(401).send('Login Error');
        }
    });

});
app.get("/user-list", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
app.post('/categories', (req, res) => {
    categoryCollection.insertOne(req.body, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
});
app.get('/categories-list', (req, res) => {
    categoryCollection.find({}).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});
app.delete('/delete-category/:id', (req, res) => {
    categoryCollection.deleteOne({ _id: ObjectID(req.params.id) }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (result.result.n === 0) {
            res.status(404).send({
                message: "record not found with id " + req.params.id
            });
        } else {
            res.send({ message: "record deleted successfully!" });
        }
    });
});
app.patch("/update-category/:id", async(req,res)=>{
    const id = req.params.id;
    const newLms=req.body;
    console.log("id :"+id);
    console.log("new:"+newLms);
    try{
        const existingLmsDocs = await lmsModel.findById(id);
        console.log(''+existingLmsDocs);
        if(isNullOrUndefined(newLms.categoryName) || isNullOrUndefined(newLms.categoryDes) || isNullOrUndefined(newLms.categoryImg)){
            res.status(400).send({message:"Data not present"});
        }else{
            if(!isNullOrUndefined(newLms.categoryName)){
                existingLmsDocs.categoryName = categoryName;
            }
            if(!isNullOrUndefined(newLms.categoryDes)){
                existingLmsDocs.categoryDes = categoryDes;
            }
            if(!isNullOrUndefined(newLms.categoryImg)){
                existingLmsDocs.categoryImg = categoryImg;
            }
            await existingLmsDocs.save();
            res.send(existingLmsDocs);
        }
    }catch(e){
        console.log(e);
        res.status(400).send({message:e.message});
        
    }
});
app.listen(8000, function () {
    console.log('listening on 8000');
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        categoryCollection = database.collection("categories");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
})