const bcrypt = require('bcrypt');
const { setToken } = require("../middlewares/checkAuthentication");
const User = require("../models/userSchema");

const handleSignInPage = (req, res) => {
    const alert = req.flash("alert");
    const success = req.flash("success");
    return res.render("sign-in",{
        alert,
        success
    });
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            req.flash("alert", "Invalid username/password");
            return res.status(400).redirect("/sign-in");
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            req.flash("alert", "Invalid email or password");
            return res.status(400).redirect("/sign-in");
        }
        const token = setToken(user);
        res.cookie("token", token, {httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(200).redirect("/user/homepage");
    } catch (error) {
        if (error) {
            console.error("Error in logging in");
            res.status(500).render("error");
        }
    }
}

const handleLogout = (req,res)=>{
    res.clearCookie("token");
    return res.redirect("/");
}

module.exports = { handleSignInPage, handleLogin, handleLogout };