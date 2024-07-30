-- CreateTable
CREATE TABLE "Subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignedSubjects" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssignedSubjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssignedSubjects" ADD CONSTRAINT "AssignedSubjects_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedSubjects" ADD CONSTRAINT "AssignedSubjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
