-- CreateTable
CREATE TABLE "Assessments" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "academicTermId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classSessionId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "marks" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_academicTermId_fkey" FOREIGN KEY ("academicTermId") REFERENCES "AcademicTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_classSessionId_fkey" FOREIGN KEY ("classSessionId") REFERENCES "ClassSections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
