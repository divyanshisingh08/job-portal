const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User Not Authenticated" });
        }

        // Validate token and fetch user
        const decodedMessage = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedMessage.userId);

        if (!user) {
            return res.status(401).json({ message: "Invalid User" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = isAuthenticated;
