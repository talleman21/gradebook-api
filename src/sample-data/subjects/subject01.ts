import { Student } from "@prisma/client";
import { RawStudent, StudentDTO } from "../../types";
import { getCurriculum01 } from "../curriculums";

export const getSubjectBodyObject01 = (): Omit<Student, "id"> => ({
  name: "TestSubject01",
});

export const getSubject01 = (): RawStudent => ({
  id: "TestSubject01",
  name: "TestSubject01",
  curriculums: [getCurriculum01()],
});

export const getSubjectDTO01 = (): StudentDTO => ({
  id: "TestSubject01",
  name: "TestSubject01",
  curriculumIds: ["TestCurriculum01"],
});
