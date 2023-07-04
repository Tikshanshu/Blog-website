

const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");

const methodOverride =require("method-override");
const ejs = require("ejs");


const app =express();
mongoose.connect("mongodb://127.0.0.1:27017/blogDB");
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))

app.use(methodOverride("_method"));


let d=new Date();

app.get("/",async (req,res)=>{
    const articles = await Article.find().sort({createdAt:"desc"})
   res.render("articles/index",{articles:articles});
})
app.use("/articles",articleRouter);
app.listen(5000,()=>{
    console.log("server started at port 5000");
})