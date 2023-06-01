const {hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel")

const JWT_SECRET = "ThisIsNotASecret"

exports.register = async (req, res) => {
    try {
        // 1. destructure name, email, password from req.body
        const { name, email, password } = req.body;
        // 2. all fields require validation
        if (!name) {
            return res.json({ error: "Name is required" });
        }
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters long" });
        }
        // 3. check if email is taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: "Email is taken" });
        }
        // 4. hash password
        const hashedPassword = await hashPassword(password);
        // 5. register user
        const user = await new User({
            name,
            email,
            password: hashedPassword,
        }).save();
        // 6. create signed jwt
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "1d",
        });
        // 7. send response
        res.json({
            user: {
                name: user.name,
                email: user.email
            },
            token,
        });
    } catch (err) {
        console.log(err);
    }
};


exports.login = async (req, res) => {
    try {
        // 1. destructure name, email, password from req.body
        const { email, password } = req.body;
        // 2. all fields require validation
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters long" });
        }
        // 3. check if email is taken
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        // 4. compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({ error: "Invalid email or password" });
        }
        // 5. create signed jwt
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        // 7. send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.log(err);
    }
};



exports.protected = async (req,res) =>{
    try {
        //Verify the auth token
        const token = req.headers.token;
        if (!token){
            return res.json({error: "No token Provided"})
        }
        try {
            const decode = await jwt.verify(token, JWT_SECRET);
            res.json({message:"Protected route accessed Successfully"})
        }catch (err) {
            console.log(err);
            return res.json({message:"Invalid Token"});
        }
    }catch (err){
        console.log(err);
        return res.json({message:"Internal server error"});
    }
}