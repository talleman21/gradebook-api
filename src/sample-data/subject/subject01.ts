import { Curriculum, Student, Subject } from "@prisma/client";
import { getCurriculum01 } from "../curriculum";
import { getStudent01 } from "../student";

const student = {
  ...getStudent01(),
  subjects: undefined,
  instructors: undefined,
};
const curriculum = { ...getCurriculum01() };

export const getSubject01 = (): Subject & {
  students: Student[];
  curriculums: Curriculum[];
} => ({
  id: "TestSubject01",
  name: "TestSubject01",
  students: [student],
  curriculums: [curriculum],
});
