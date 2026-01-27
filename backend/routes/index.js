import { Router } from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/api/task", taskRouter);

export default router;
