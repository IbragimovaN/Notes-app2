import express from "express";
import authRoutes from "./auth.js";
import notesRoutes from "./notes.js";

const router = express.Router({ mergeParams: true });

router.use("/", authRoutes);
router.use("/notes", notesRoutes);

export default router;
