const CustomerSupport = require("../models/customerSupportSchema");
const URL = require("../models/urlSchema");

const handleHomePage = async (req, res) => {
    return res.render("home");
}

function handleCustomerSupportPage(req, res) {
    return res.render("contact-us");
}

async function handleCustomerMessage(req, res) {
    try {
        await CustomerSupport.create(
            req.body
        );

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).render("error");
    }
}

module.exports = { handleHomePage, handleCustomerSupportPage, handleCustomerMessage };