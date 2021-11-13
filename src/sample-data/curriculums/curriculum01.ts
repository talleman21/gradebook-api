import { Curriculum } from "@prisma/client";
import { RawCurriculum, CurriculumDTO } from "../../types";
import { getAssignment01 } from "../assignments";

export const getCurriculumBodyObject01 = (): Omit<Curriculum, "id"> & {
  studentIds: string[];
  assignmentIds: string[];
} => ({
  name: "TestAssignment01",
  subjectId: "TestSubject01",
  instructorId: "TestInstructor01",
  studentIds: ["TestStudent01"],
  assignmentIds: ["TestAssignment01"],
});

export const getCurriculum01 = (): RawCurriculum => ({
  id: "TestCurriculum01",
  name: "TestCurriculum01",
  subjectId: "TestSubject01",
  instructorId: "TestInstructor01",
  students: [
    {
      id: "TestStudent01",
      name: "TestStudent01",
    },
  ],
  assignments: [getAssignment01()],
});

export const getCurriculumDTO01 = (): CurriculumDTO => ({
  id: "TestCurriculum01",
  name: "TestCurriculum01",
  subjectId: "TestSubject01",
  instructorId: "TestInstructor01",
  studentIds: ["TestStudent01"],
  assignmentIds: ["TestAssignment01"],
});
