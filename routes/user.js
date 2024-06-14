const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get('/signin',(req,res)=>{
    return res.render("signin");
});
router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordandGeneratetoken(email,password);
        console.log("token",token);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        res.render("signin",{
            error:"Incorrect Email or  Password"
        });
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

router.post('/signup',async(req,res)=>{
    const { fullname,email,password }= req.body;
    await User.create({fullname:fullname,email:email,password:password});
    return res.redirect("/")
});

router.get('/account',async(req,res)=>{
    try{
        const userId= req.user._id;
        const user= await User.findById(userId);
        const userBlog = await Blog.find({ createdBy:userId});

        res.render("account",{
            user:user,
            blogscount: userBlog.length,
            blogs:userBlog
        });
    }catch(error){
        console.error('error');
        res.status(500).send('Internal server error');
    }
});


module.exports = router;