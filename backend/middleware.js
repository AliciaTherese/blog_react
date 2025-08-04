const jwt = require("jsonwebtoken");
let key = "secret"
const {UserModel, BlogModel}=require("./models.js")

function authentication(req, res, next) {
    let token = req.headers.token;
    let decrypted = jwt.verify(token, key);
    let username = decrypted.username
    let id=decrypted.id
    
    UserModel.findOne({
        username: username
    }).then(function (user) {
        if (!user) {
            res.status(401).json({ message: "Some error has occured" })
        }
        else{
            req.username=username;
            req.id=id;
            next()
        }
    })
}

module.exports={
    authentication
}
