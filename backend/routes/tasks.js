import { Router } from "express";
import requireAuth from "../auth/requireAuth.js";
import prisma from "../db/prisma.js";

const router = Router();

router.post("/create", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        createdBy: { connect: { id: userId } },
      },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Task creation failed" });
  }
});
