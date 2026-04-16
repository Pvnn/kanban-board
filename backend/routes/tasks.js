import { Router } from "express";
import requireAuth from "../auth/requireAuth.js";
import prisma from "../db/prisma.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { status: "TODO" },
          { createdByUserId: userId },
          { assignedToUserId: userId },
        ],
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Task fetching failed" });
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

      const newTask = await tx.task.create({
        data: {
          title,
          description,
          status: status || "TODO",
          createdBy: { connect: { id: userId } },
          project: { connect: { id: finalProjectId } },
        },
        include: { createdBy: true, project: true, assignedTo: true },
      });

      await tx.activityLog.create({
        data: {
          type: "CREATED",
          message: "created this task",
          taskId: newTask.id,
          actorId: userId,
        },
      });

      return newTask;
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

router.delete("/:taskId", requireAuth, async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  if (!taskId) {
    return res.status(400).json({ error: "Task id required" });
  }
  try {
    const result = await prisma.task.deleteMany({
      where: {
        id: taskId,
        createdByUserId: userId,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: `Task ${taskId} deleted successfully.` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to delete task" });
  }
});

router.post("/takeup/:taskId", requireAuth, async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  if (!taskId) {
    return res.status(400).json({ error: "Task id is required." });
  }
  try {
    const updatedTasks = await prisma.task.updateManyAndReturn({
      where: {
        id: taskId,
        createdByUserId: { not: userId },
        assignedToUserId: null,
      },
      data: {
        status: "DEVELOPMENT",
        assignedToUserId: userId,
        takenUpAt: new Date(),
      },
      include: {
        project: true,
        createdBy: true,
        assignedTo: true,
      },
    });
    if (updatedTasks.length === 0) {
      return res.status(400).json({
        error: "Task not found or you cannot take up your own task",
      });
    }

    const updatedTask = updatedTasks[0];

    await prisma.activityLog.create({
      data: {
        type: "TAKEN_UP",
        message: "took up this task",
        taskId: updatedTask.id,
        actorId: userId,
      },
    });

    return res.status(200).json({ updatedTask: updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to take up the task" });
  }
});

router.post("/setTest/:taskId", requireAuth, async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  if (!taskId) {
    return res.status(400).json({ error: "Task id is required." });
  }
  try {
    const updatedTasks = await prisma.task.updateManyAndReturn({
      where: {
        id: taskId,
        createdByUserId: { not: userId },
        assignedToUserId: { not: null },
      },
      data: {
        status: "TESTING",
      },
      include: {
        project: true,
        createdBy: true,
        assignedTo: true,
      },
    });
    if (updatedTasks.length === 0) {
      return res.status(400).json({
        error: "Task not found",
      });
    }

    const updatedTask = updatedTasks[0];

    await prisma.activityLog.create({
      data: {
        type: "STATUS_UPDATED",
        message: "moved task to TESTING",
        taskId: updatedTask.id,
        actorId: userId,
      },
    });

    return res.status(200).json({ updatedTask: updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update the task" });
  }
});

router.post("/setDone/:taskId", requireAuth, async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  if (!taskId) {
    return res.status(400).json({ error: "Task id is required." });
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      const updatedTasks = await tx.task.updateManyAndReturn({
        where: {
          id: taskId,
          createdByUserId: { not: userId },
          assignedToUserId: userId,
          status: { not: "DONE" },
        },
        data: {
          status: "DONE",
          completedAt: new Date(),
        },
        include: {
          project: true,
          createdBy: true,
          assignedTo: true,
        },
      });

      if (updatedTasks.length === 0) {
        throw new Error("Task not found or not allowed");
      }

      const updatedTask = updatedTasks[0];
      let newDebtTransaction = null;

      if (updatedTask.createdByUserId !== updatedTask.assignedToUserId) {
        try {
          newDebtTransaction = await tx.debtTransaction.create({
            data: {
              fromUserId: updatedTask.createdByUserId,
              toUserId: updatedTask.assignedToUserId,
              taskId: updatedTask.id,
            },
          });
        } catch (err) {
          console.log("Debt transaction creation failed:", err.message);
        }
      }

      await tx.activityLog.create({
        data: {
          type: "DEBT_CLEARED",
          message: "completed the task",
          taskId: updatedTask.id,
          actorId: userId,
        },
      });

      return { updatedTask, newDebtTransaction };
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to update the task" });
  }
});

export default router;
