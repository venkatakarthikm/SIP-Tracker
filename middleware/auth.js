const jwt = require('jsonwebtoken');
const db = require('../models/db');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Access Denied" });

    // Check if token is blacklisted
    db.get("SELECT token FROM token_blacklist WHERE token = ?", [token], (err, row) => {
        if (row) return res.status(401).json({ error: "Token expired/Logged out" });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            req.token = token;
            next();
        } catch (err) {
            res.status(400).json({ error: "Invalid Token" });
        }
    });
};