import express from "express";
import authRoutes from "./auth.js";

const router = express.Router({ mergeParams: true });

router.use("/", authRoutes);
// router.use("/notes", notesRoutes);
router.use("/auth", authRoutes);

export default router;
