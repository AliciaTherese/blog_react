const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://alimol:alimol%40123@cluster0.zbgarll.mongodb.net/blog")
const jwt = require('jsonwebtoken')
const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

const { CreateUserInput, SigninInput, CreateBlogSchema } = require("./types.js");
const { UserModel, BlogModel } = require("./models.js")



const { authentication } = require("./middleware.js")



let key = "secret"




app.post("/signup", function (req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    const response = CreateUserInput.safeParse(req.body)

    if (!response.success) {
        return res.status(401).json({ message: "Username already exists" })
    }

    UserModel.findOne({
        username: username
    }).then(
        function (user) {
            if (user) {
                return res.status(401).json({ message: "Username already exists" })
            }
            else {
                let id = Math.floor(Math.random() * 100) + 1;
                UserModel.create({
                    id: id,
                    name: name,
                    username: username,
                    password: password
                })
                return res.send({ message: "Signed in successfully" })
            }
        }
    )

})


app.post("/signin", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    const response = SigninInput.safeParse(req.body)
    if (response.success) {
        UserModel.findOne({
            username: username,
            password: password
        }).then(
            function (user) {
                if (user) {
                    let id = user.id
                    let token = jwt.sign({ 'username': username, 'id': id }, key);
                    return res.send(token)
                }
                else {
                    return res.status(401).json({ message: "either username or password is wrong" })
                }
            }
        )

    }
    else {
        return res.status(401).json({ message: "Username already exists" })
    }
})


//create blogs
app.post("/createblog", authentication, async function (req, res) {
    let title = req.body.title;
    let blog_content = req.body.blog_content;
    const response = CreateBlogSchema.safeParse(req.body)
    if (!response.success) {
        return res.status(401).json({ message: "Username already exists" })
    }
    else {
        let id = req.id
        await UserModel.findOne({
            user_id: id
        }).then(
            function (user) {
                let blog_id = Math.floor(Math.random() * 100) + 123
                if (id) {

                    BlogModel.create({ user_id: id, blog_id: blog_id, title: title, content: blog_content })
                    return res.send("success")
                }
                else {
                    return res.status(204).json({ messgae: "user does not exists" })
                }
            }
        )
    }
})



//to view thw blogs of the user
app.get('/viewmyblog', authentication, function (req, res) {
    let id = req.id;

    BlogModel.find({
        user_id: id
    }).then(
        function (response) {
            if (response.length > 0) {
                return res.send(response)
            }
            else {
                return res.status(404).json({ message: "error occured" })
            }
        }
    );
})

//to view all the blogs
app.get('/viewallblogs', authentication, function (req, res) {

    BlogModel.find()
        .then(function (response) {
            if (response) {
                return res.send(response)
            }
            else {
                return res.status(403).json({ message: "No blogs" })
            }
        }

        )


})


// View a specific blog
app.get("/viewablog/:id", authentication, function (req, res) {


    let blog_id = req.params.id;
    BlogModel.findOne({
        blog_id: blog_id
    }).then(function (response) {

        if (response) {
            return res.send(response)
        }
        else {
            return res.status(401).json({ message: "Error" })
        }
    })
})


app.delete("/delete/:id",authentication,function(req,res){
    let blog_id=req.params.id;
    let id=req.id;
    console.log("user idd",id);
    console.log("blog id",blog_id);
    BlogModel.deleteOne({
        blog_id:blog_id
    }).then(function(response){
        if(response.deletedCount==0){
           return res.status(401).json({ message: "Error" })
        }
        else{
            BlogModel.find({
                user_id:id
            }).then(function(response){
                console.log(response);
                if(!response){
                    return res.status(401).json({message:"error"})
                }
                return res.send(response)
            })
        }
    })
})

app.listen(3003);