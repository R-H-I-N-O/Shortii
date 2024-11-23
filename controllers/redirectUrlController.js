const URL = require('../models/urlSchema');

const handleRedirectUrl = async (req, res) => {
    try {
        const shortID = req.params['shortid'];
        const data = await URL.findOneAndUpdate({
            shortID
        }, {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        })
        if (!data) {
            return res.status(400).send("Invalid request");
        }
        return res.redirect(data.orginalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).render("error");
    }
}

module.exports = handleRedirectUrl;