/*
  Warnings:

  - Added the required column `curriculumId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Curriculum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "curriculumId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Curriculum" ADD COLUMN     "subjectId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InstructorToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InstructorToStudent_AB_unique" ON "_InstructorToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_InstructorToStudent_B_index" ON "_InstructorToStudent"("B");

-- AddForeignKey
ALTER TABLE "Curriculum" ADD FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToStudent" ADD FOREIGN KEY ("A") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstructorToStudent" ADD FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
