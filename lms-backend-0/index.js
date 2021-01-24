import { text } from "body-parser";
import { mongo, Mongoose } from "mongoose"
import express from express;
import cors from cors;
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json);
app.use(cors());
const db = Mongoose("mongodb://localhost:3000", { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    // phonenumber:Number,
    password: String
});
const categorySchema = new Mongoose.Schema({
    categoryName: String,
    categoryDes: String,
    categoryImg: String,
    // categoryId: Mongoose.Schema.types.objectId
});
// const bookSchema = new Mongoose.Schema({
//     title:String,
//     author:String,
//     bookDes:String,
//     bookImg:String,
//     totalBook:Number,
//     issuedBook:Number,
//     issueDate:Date,
//     submissionDate:Date,
//     duration:Number,
//     bookId:Mongoose.Schema.types.objectId
// })

const userModel = db.model('user', userSchema);
// 
const isNullOrUndefined = val => val === null || val === undefined;

const SALT = '5';
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (isNullOrUndefined(existingUser)) {
        const hashedPwd = bcrypt.hashSync(password, SALT);
        const newUser = new userModel({firstName,lastName,email,password:hashedPwd});
        await newUser.save();
        res.status(201).send({success:'signed up'});
    } else {
        res.status(400).send({ err: 'user already exists.' });
    }
});
app.post('/login', async(req,res)=>{
    const {email,password} =req.body;
    const hashedPwd = bcrypt.hashSync(password,SALT);
    const existingUser = await userModel.findOne({email,password:hashedPwd});
    if(isNullOrUndefined(existingUser)){
        res.status(401).send({err:'email/password incorrect'});
    }else{
        res.status(200).send({success:'loged in'});
    }
});
const authMiddleware = async(req,res,next)=>{
    const email = req.headers['x-email'];
    const password = req.headers['x-password'];
    if(isNullOrUndefined(existingUser)){
        res.status(401).send({err:'email/password incorrect'});
    }else{
        const hashedPwd = bcrypt.hashSync(password,SALT);
        const existingUser = await userModel.findOne({
            email,
            password:hashedPwd
        });
        if(isNullOrUndefined(existingUser)){
            res.status(401).send({err:'email/password incorrect'});
        }else{
            req.user = existingUser;
            next();
        }
    }
}
app.get("/user-list",authMiddleware,async(req,res)=>{
const allUsers = await userModel.find({email:req.user._id});
res.send(allUsers);
});
