/*
  Warnings:

  - You are about to drop the `Curriculumns` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Curriculumns";

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "studentIds" JSONB NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
