import Room from "../models/Room";
import { Router } from "express";
import verifyToken, { verifyAdmin } from "../utils/verifyToken";

export let roomRouter = Router();

// GET all rooms
roomRouter.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.json(rooms);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET single room by ID
roomRouter.get("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ error: "Room not found" });
        return res.json(room);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// CREATE new room (Admin only)
roomRouter.post("/", async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        return res.status(201).json(room);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// UPDATE existing room by ID (Admin only)
roomRouter.put("/:id", async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRoom) return res.status(404).json({ error: "Room not found" });
        return res.json(updatedRoom);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// DELETE room by ID (Admin only)
roomRouter.delete("/:id", async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) return res.status(404).json({ error: "Room not found" });
        return res.json({ message: "Room deleted", room: deletedRoom });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
