const zod= require("zod")

const CreateUserInput=zod.object({
    username:zod.string().max(20).min(3),
    name:zod.string().max(20).min(3),
    password:zod.string().max(20).min(3)
})

const SigninInput=zod.object({
    username:zod.string().max(20).min(3),
    password:zod.string().max(20).min(3)
})

const CreateBlogSchema =zod.object({
    title:zod.string(),
    blog_content: zod.string()
})

module.exports = {
    SigninInput,
    CreateUserInput,
    CreateBlogSchema
}



