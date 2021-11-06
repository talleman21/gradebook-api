import { Student } from "@prisma/client";
import { RawStudent, StudentDTO } from "../../types";
import { getCurriculum01 } from "..";

export const getStudentBodyObject01 = (): Omit<Student, "id"> & {
  curriculumIds: string[];
} => ({
  name: "TestStudent01",
  curriculumIds: ["TestCurriculum01"],
});

export const getStudent01 = (): RawStudent => ({
  id: "TestStudent01",
  name: "TestStudent01",
  curriculums: [getCurriculum01()],
});

export const getStudentDTO01 = (): StudentDTO => ({
  id: "TestStudent01",
  name: "TestStudent01",
  curriculumIds: ["TestCurriculum01"],
});
