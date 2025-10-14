/*
  Warnings:

  - A unique constraint covering the columns `[logId]` on the table `LogAnalysis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LogAnalysis_logId_key" ON "LogAnalysis"("logId");
