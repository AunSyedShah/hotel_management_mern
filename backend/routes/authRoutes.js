import { Router } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/User";
import jwt from 'jsonwebtoken';


export let authRouter = Router()


authRouter.post("/register", async (req, res) => {
    try {
        let password = req.body.password;
        if (!password) {
            return res.status(500).json(
                {
                    message: "password should be provided"
                }
            )
        }
        password = await bcrypt.hash(password, 10)
        const name = req.body.name;
        const email = req.body.email;
        const user = new User(
            {
                name, email, password
            }
        )
        await user.save();
        return res.json(
            {
                message: user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                error: error.message
            }
        )
    }
}
)

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json(
                {
                    error: "invalid login credentials"
                }
            )
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json(
                {
                    error: "invalid login credentials"
                }
            )
        }
        let data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            status: user.status,
            role: user.role
        }
        const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.json(
            {
                user: data,
                token
            }
        )
    } catch (error) {
        console.log(error)
        return res.json({ error: error.message })
    }
})