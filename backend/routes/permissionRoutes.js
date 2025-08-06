// routes/permissionRoutes.js
import express from "express";
import { Permission } from "../models/Permission";
import { verifyAdmin } from "../utils/verifyToken";

export const permissionRouter = express.Router();

// Get all permissions
permissionRouter.get("/", verifyAdmin, async (req, res) => {
  try {
    const all = await Permission.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
});

// Get permission by role
permissionRouter.get("/:role", async (req, res) => {
  try {
    const result = await Permission.findOne({ role: req.params.role });
    if (!result) return res.status(404).json({ message: "Role not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch role permissions" });
  }
});

// Create or update permission
permissionRouter.post("/", async (req, res) => {
  try {
    const { role, permissions } = req.body;

    const updated = await Permission.findOneAndUpdate(
      { role },
      { $set: { permissions } },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error updating permissions" });
  }
});

// Delete a permission set
permissionRouter.delete("/:role", async (req, res) => {
  try {
    const deleted = await Permission.findOneAndDelete({ role: req.params.role });
    if (!deleted) return res.status(404).json({ message: "Permission not found" });
    res.json({ message: "Deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: "Error deleting permissions" });
  }
});
