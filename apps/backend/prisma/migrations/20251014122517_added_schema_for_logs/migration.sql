-- CreateTable
CREATE TABLE "HttpLog" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "srcIp" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HttpLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAnalysis" (
    "id" TEXT NOT NULL,
    "logId" TEXT NOT NULL,
    "attackType" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LogAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogAnalysis" ADD CONSTRAINT "LogAnalysis_logId_fkey" FOREIGN KEY ("logId") REFERENCES "HttpLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
