import express from "express";
import Validator from "../lib/validator.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authMiddleware, async (req, res) => {
    const { name, surname } = req.user;
    res.send({ name, surname });
});

router.post("/signup", async (req, res) => {
    
    if (!req.body) {
        return res.status(400).json({ message: "Invalid payload" });
    }
    
    const payload = req.body;

    if (!payload.name || !payload.surname || !payload.age || !payload.email || !payload.password) {
        return res.status(400).json({ message: "Please, provide all fields" });
    }

    if (!Validator.isValidPassword(payload.password)) {
        return res.status(400).json({ password: "Invalid password: should have 8–50 chars, at least 1 lowercase, 1 uppercase, 1 digit, 1 special"});
    }
    
    req.body.password = await bcrypt.hash(payload.password, 10);

    try {
        
        await User.create(req.body);

        return res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
            const errors = {};
            err.errors.forEach(e => {
                errors[e.path] = e.message;
            });
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.post("/login", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Invalid payload" });
    }
    
    const payload = req.body;

    if (!payload.email || !payload.password) {
        return res.status(400).json({ message: "Please, provide all fields" });
    }

    const user = await User.findOne({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        return res.status(401).json({ message: "Wrong credentials" });
    }
    
    const isCorrect = await bcrypt.compare(payload.password, user.password);

    if (!isCorrect) {
        return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { "expiresIn": '1h' });
    return res.json({ token });
});

export default router;