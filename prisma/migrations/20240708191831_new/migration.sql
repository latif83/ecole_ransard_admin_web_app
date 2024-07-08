-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "classId" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
