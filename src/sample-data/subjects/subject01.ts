import { Subject } from "@prisma/client";
import { RawSubject, SubjectDTO } from "../../types";
import { getCurriculum01 } from "../curriculums";

export const getSubjectBodyObject01 = (): Omit<Subject, "id"> => ({
  name: "TestSubject01",
});

export const getSubject01 = (): RawSubject => ({
  id: "TestSubject01",
  name: "TestSubject01",
  curriculums: [getCurriculum01()],
});

export const getSubjectDTO01 = (): SubjectDTO => ({
  id: "TestSubject01",
  name: "TestSubject01",
  curriculumIds: ["TestCurriculum01"],
});
