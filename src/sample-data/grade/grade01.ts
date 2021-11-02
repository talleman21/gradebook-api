import { Grade } from "@prisma/client";

export const getGrade01 = (): Grade => ({
  id: "TestGrade01",
  grade: 97,
  studentId: "TestStudent01",
  assignmentId: "TestAssignment01",
});
