import { Instructor, Student, Subject } from "@prisma/client";

export const getStudent01 = (): Student & {
  subjects: Subject[];
  instructors: Instructor[];
} => ({
  id: "TestStudent01",
  name: "TestStudent01",
  instructors: [{ id: "TestInstructor01", name: "TestInstructor01" }],
  subjects: [{ id: "TestSubject01", name: "TestSubject01" }],
});
