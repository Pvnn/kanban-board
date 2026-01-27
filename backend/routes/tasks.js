import { Router } from "express";
import requireAuth from "../auth/requireAuth.js";
import prisma from "../db/prisma.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res.send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Task creation failed" });
  }
});

router.post("/create", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      status,
      projectId,
      projectName,
      projectDescription,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const task = await prisma.$transaction(async (tx) => {
      let finalProjectId;

      if (projectId) {
        const project = await tx.project.findUnique({
          where: { id: projectId },
        });

        if (!project) {
          throw new Error("PROJECT_NOT_FOUND");
        }

        finalProjectId = project.id;
      } else if (projectName) {
        const newProject = await tx.project.create({
          data: {
            name: projectName,
            description: projectDescription || null,
            userId: userId,
          },
        });

        finalProjectId = newProject.id;
      } else {
        throw new Error("PROJECT_REQUIRED");
      }

      return tx.task.create({
        data: {
          title,
          description,
          status: status || "TODO",
          createdBy: { connect: { id: userId } },
          project: { connect: { id: finalProjectId } },
        },
        include: {
          project: true,
          createdBy: true,
        },
      });
    });

    res.status(201).json(task);
  } catch (err) {
    if (err.message === "PROJECT_NOT_FOUND") {
      return res.status(404).json({ error: "Project not found" });
    }

    if (err.message === "PROJECT_REQUIRED") {
      return res.status(400).json({
        error: "Either projectId or projectName is required",
      });
    }

    console.error(err);
    res.status(500).json({ error: "Task creation failed" });
  }
});

export default router;
