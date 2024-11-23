const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "./public/uploads");
    },
    filename: function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({storage});

const {handleHomePage, handleCustomerSupportPage, handleCustomerMessage} = require('../controllers/homeController');
const {handleSignInPage, handleLogin, handleLogout} = require("../controllers/signInController");
const {handleSignUpPage, handleCreateUser} = require("../controllers/signUpController");
const { checkAuth, tokenVerify } = require('../middlewares/checkAuthentication');
const handleRedirectUrl = require('../controllers/redirectUrlController');

router.get("/", checkAuth, handleHomePage);
router.get("/contact-us", handleCustomerSupportPage);
router.post("/contact-us/message", handleCustomerMessage);
router.get("/sign-in", checkAuth, handleSignInPage );
router.get("/sign-up", checkAuth, handleSignUpPage );
router.post("/create", upload.single("profilePic"), handleCreateUser);
router.post("/login", handleLogin);
router.get("/logout", handleLogout)
router.use("/user", tokenVerify, require("./user"));
router.get("/:shortid", handleRedirectUrl);

module.exports = router;