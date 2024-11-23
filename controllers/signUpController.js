const bcrypt = require('bcrypt')
const User = require("../models/userSchema");
const saltRound = 10;

const handleSignUpPage = (req, res) => {
    const alert = req.flash("alert")
    return res.render("sign-up",{
        alert
    });
}

const handleCreateUser = async (req, res) => {
    try {
        const { fullName, email, dob, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            req.flash("alert", "Passwords don't match!");
            return res.status(400).redirect("/sign-up");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("alert", "User already exists! Please sign in.");
            return res.status(400).redirect("/sign-in");
        }
        const hashedPassword = await bcrypt.hash(password, saltRound);
        await User.create({
            fullName,
            profilePic: `/uploads/${req.file.filename}`,
            email,
            dob,
            password: hashedPassword
        });

        req.flash("success", "User created successfully! Please sign in.");
        return res.status(201).redirect("/sign-in");
    } catch (error) {
        console.error("Error in user creation", error);
        return res.status(500).render("error");
    }
}

module.exports = { handleSignUpPage, handleCreateUser };