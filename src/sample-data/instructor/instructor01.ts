import { Instructor, Student } from "@prisma/client";

export const getInstructor01 = (): Instructor & { students: Student[] } => ({
  id: "TestInstructor01",
  name: "TestInstructor01",
  students: [{ id: "TestStudent01", name: "TestStudent01" }],
});
