import { Router } from "express";
import prisma from "../db/prisma.js";
import requireAuth from "../auth/requireAuth.js";

const router = Router();

router.get("/dashboard", requireAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    //Compute totalDebt
    const totalDebtPromise = prisma.debtTransaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        fromUserId: userId,
      },
    });

    // Compute total owed (what others owe current user)
    const totalOwedPromise = prisma.debtTransaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        toUserId: userId,
      },
    });

    // Compute Active Tasks
    const activeTasksPromise = prisma.task.findMany({
      where: {
        assignedToUserId: userId,
        status: { not: "DONE" },
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    //Retrieve Recent Activity
    const recentActivityPromise = prisma.debtTransaction.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        fromUser: true,
        toUser: true,
        task: true,
      },
    });

    const [debt, owed, tasks, activity] = await Promise.all([
      totalDebtPromise,
      totalOwedPromise,
      activeTasksPromise,
      recentActivityPromise,
    ]);

    const totalDebt = debt._sum.amount || 0;
    const totalOwed = owed._sum.amount || 0;
    const net = totalDebt - totalOwed;

    return res.status(200).json({
      netDebt: net,
      totalDebt,
      totalOwed,
      tasks,
      activity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch Dashboard Data" });
  }
});

export default router;
