const express = require("express");
const router = express.Router();
const multer =require("multer");
const  path =require("path");
const Blog = require("../models/blog");
const comment = require("../models/comment");


const storage =  multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null,fileName);
    },
});

const upload  = multer({storage:storage});

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user: req.user,
    })
});

router.post("/",upload.single("coverImage"),  async (req,res)=>{
    const {title,body} = req.body
    const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);  
});

router.get("/:id",async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await comment.find({blogId:req.params.id}).populate("createdBy");
    console.log("blog",blog);
    return res.render("blog",{
        user: req.user,
        blog,
        comments,
    })
})

router.post("/comment/:blogId",async (req,res)=>{
    await comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
})
router.delete("/:id",async (req,res)=>{
    try{
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;