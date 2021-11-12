import { Grade } from "@prisma/client";

export const getGradeBodyObject01 = (): Omit<Grade, "id"> => ({
  grade: 97,
  studentId: "TestStudent01",
  assignmentId: "TestAssignment01",
});

export const getGrade01 = (): Grade => ({
  id: "TestGrade01",
  grade: 97,
  studentId: "TestStudent01",
  assignmentId: "TestAssignment01",
});
