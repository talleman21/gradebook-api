/*
  Warnings:

  - You are about to drop the column `studentIds` on the `Curriculum` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Curriculum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Curriculum" DROP COLUMN "studentIds",
DROP COLUMN "subjectId";
