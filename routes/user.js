const express = require('express');
const router = express.Router();

const {handleAnalytics, handleShortningController, handleUserHomepage, handleProfilePage} = require('../controllers/userController')

router.post("/generate-url",handleShortningController);
router.get("/analytics", handleAnalytics);
router.get("/homepage", handleUserHomepage);
router.get("/profile", handleProfilePage);


module.exports = router;