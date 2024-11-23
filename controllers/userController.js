const URL = require('../models/urlSchema');
const shortid = require('shortid');
const User = require('../models/userSchema');

function handleUserHomepage(req, res) {
    return res.render("user-homepage", {
        shortID: ""
    });
}

const handleAnalytics = async (req, res) => {
    try {
        const { _id } = req.user;
        const urls = await URL.find({ createdBy: _id });
        return res.status(200).render("analytics", {
            urls
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("error");
    }
}

const handleShortningController = async (req, res) => {
    try {
        const body = req.body;
        const { _id } = req.user;
        if (!body.url) {
            req.flash("alert", "Invalid email or password");
            return res.status(400).redirect("/user/homepages");
        }
        const shortID = shortid.generate();

        await URL.create({
            shortID: shortID,
            orginalUrl: body.url,
            visitHistory: [],
            createdBy: _id
        });
        return res.render("user-homepage", {
            shortID
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("error");
    }
}

async function handleProfilePage(req, res) {
    try {
        if (!req.user) {
            return res.redirect("/sign-in");
        }
        const { email } = req.user;
        const user = await User.findOne({ email });
        return res.render("profile", {
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("error");
    }
}

module.exports = { handleShortningController, handleAnalytics, handleUserHomepage, handleProfilePage };