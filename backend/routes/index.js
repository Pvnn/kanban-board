import { Router } from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";
import projectRouter from "./project.js";
import uiRouter from "./ui.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/task", taskRouter);
router.use("/api/project", projectRouter);
router.use("/api/ui", uiRouter);

export default router;
