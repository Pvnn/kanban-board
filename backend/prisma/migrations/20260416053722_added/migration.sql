-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_taskId_fkey";

-- DropForeignKey
ALTER TABLE "DebtTransaction" DROP CONSTRAINT "DebtTransaction_taskId_fkey";

-- AddForeignKey
ALTER TABLE "DebtTransaction" ADD CONSTRAINT "DebtTransaction_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
