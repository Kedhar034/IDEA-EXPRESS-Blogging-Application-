require("dotenv").config();

const express =  require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser   = require("cookie-parser");
const Blog = require("./models/blog");
const methodOveride = require('method-override');


const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');

const { checkforAuthenticationcookie } = require("./middlewares/authentication");

const app  = express();
//while deploying this project in any cloud serivce we cant take direct host(portal), istead we should take dynamic variable;
const port = process.env.port || 9000;

mongoose
    .connect("mongodb://127.0.0.1:27017/IdeaExpress")
    .then(e => console.log("mongoDB is connected"));

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkforAuthenticationcookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(methodOveride('_method'));

app.get("/",async (req,res)=>{
    const AllBlogs = await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs: AllBlogs
    });
})

app.use("/user",UserRoute);
app.use("/blog",BlogRoute);

app.listen(port,()=>console.log("Server started"));