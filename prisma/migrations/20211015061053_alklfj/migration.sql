/*
  Warnings:

  - You are about to drop the `Assignments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Assignments";

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grade" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
