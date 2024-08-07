-- CreateTable
CREATE TABLE "GradeSetting" (
    "id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "minScore" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GradeSetting_pkey" PRIMARY KEY ("id")
);
