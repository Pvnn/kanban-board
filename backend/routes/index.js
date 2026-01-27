import { Router } from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";
import projectRouter from "./project.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/task", taskRouter);
router.use("/api/project", projectRouter);

export default router;
