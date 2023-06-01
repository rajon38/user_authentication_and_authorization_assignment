const express = require('express');

// middlewares
const { requireSignin } =require("../middleware/auth.js");
// controllers
const {
    register,
    login,
    protected
} = require("../controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected",requireSignin, protected);

module.exports = router;