const jwt =require("jsonwebtoken");
const User =require("../models/UserModel");

const JWT_SECRET = "ThisIsNotASecret"
exports.requireSignin = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.token,
            JWT_SECRET
        );

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};