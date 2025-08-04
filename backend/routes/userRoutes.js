import User from "../models/User";
import { Router } from "express";


export const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.json({ error: error.message })
    }
})

userRouter.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json(
        {
            message: user
        }
    )
})