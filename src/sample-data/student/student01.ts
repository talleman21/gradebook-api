import { Instructor, Student } from "@prisma/client";

export const getStudent01 = (): Student & { instructors: Instructor[] } => ({
  id: "TestStudent01",
  name: "TestStudent01",
  instructors: [{ id: "TestInstructor01", name: "TestInstructor01" }],
});
