const { default: mongoose } = require("mongoose")

const UserSchema =new mongoose.Schema({
    id:Number,
    name:String,
    username:String,
    password:String,
    
})
const BlogSchema =new mongoose.Schema({
    user_id:Number,
    blog_id:Number,
    title:String,
    content:String,
})



module.exports ={
    UserModel :mongoose.model("users",UserSchema),
    BlogModel: mongoose.model("blogs",BlogSchema)
}