import { Curriculum, Student } from "@prisma/client";

export type RawStudent = Student & {
  curriculums: Curriculum[];
};

export type StudentDTO = Student & {
  curriculumIds: string[];
};
