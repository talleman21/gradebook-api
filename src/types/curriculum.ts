import { Assignment, Curriculum, Student } from "@prisma/client";

export type RawCurriculum = Curriculum & {
  students: Student[];
  assignments: Assignment[];
};

export type CurriculumDTO = Curriculum & {
  studentIds: string[];
  assignmentIds: string[];
};
