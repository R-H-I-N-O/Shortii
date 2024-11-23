const jwt = require("jsonwebtoken");
const secretKey = "TonyStark@123$#*";

function setToken(user){
    const {_id, email, fullName} = user;
    const token = jwt.sign({
        _id,
        email,
        fullName
    }, secretKey, {expiresIn: "30min"});
    return token;
}

function checkAuth(req,res,next){
    const token = req.cookies.token;
    jwt.verify(token, secretKey, (err, payload)=>{
        if(!err && payload){
            return res.redirect("/user/homepage")
        }else{
            res.clearCookie("token");
        }
    });
    next();
}

function tokenVerify(req, res, next){
    const token = req.cookies.token;
    
    if(!token){
        return res.redirect("/");
    }
    jwt.verify(token, secretKey, (err, payload)=>{
        if(err){
            return res.redirect('/');
        }
        req.user = payload;
        res.locals.user = payload;
    });
    next();

}

module.exports = {checkAuth, setToken, tokenVerify}