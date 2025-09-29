import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(400).json({ message: "Provide a token" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Invalid/expired data" });
        }
        const user = await User.findByPk(data.id, {
            attributes: { exclude: ["password"] }
        });
        if (user) {
            req.user = user.toJSON();
            next();
        }
    });
}