import { Router } from "express";
import prisma from "../db/prisma.js";
import requireAuth from "../auth/requireAuth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    return res.send(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to retrieve projects" });
  }
});

export default router;
